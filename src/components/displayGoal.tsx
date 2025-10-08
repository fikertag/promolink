"use client";

import { useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Edit2 } from "lucide-react";

type PaceStatus = "ahead" | "on track" | "behind" | "not started";

export interface Goal {
  businessId: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  startDate: string | Date;
  estimatedEndDate: string | Date;
  createdAt?: string | Date;
  _id?: string;
}

interface ProgressGoalProps {
  businessId?: string;
  goals?: Goal[];
}

function toDate(d: string | Date): Date {
  return d instanceof Date ? d : new Date(d);
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function computePace(goal: Goal): {
  status: PaceStatus;
  expectedPercent: number;
  actualPercent: number;
} {
  const now = new Date();
  const start = toDate(goal.startDate);
  const end = toDate(goal.estimatedEndDate);

  // Guard: invalid dates or zero/negative target
  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    goal.targetValue <= 0
  ) {
    return { status: "not started", expectedPercent: 0, actualPercent: 0 };
  }

  const totalDuration = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  const actualPercent = clamp((goal.currentValue / goal.targetValue) * 100);

  // Not started: start date is in the future (allow tiny clock skews)
  if (elapsed < -60_000) {
    return { status: "not started", expectedPercent: 0, actualPercent };
  }

  // Handle zero or negative duration
  if (totalDuration <= 0) {
    // Treat as immediate goal window; compare actual vs 100%
    const diff = actualPercent - 100;
    const status: PaceStatus = diff > 5 ? "ahead" : diff < -5 ? "behind" : "on track";
    return { status, expectedPercent: 100, actualPercent };
  }

  // Expected progress based on time elapsed in the window
  const expectedRaw = (Math.max(0, Math.min(elapsed, totalDuration)) / totalDuration) * 100;
  const expectedPercent = clamp(expectedRaw);

  // Determine status with a small tolerance to avoid flapping
  const paceDiff = actualPercent - expectedPercent;
  const status: PaceStatus = paceDiff > 5 ? "ahead" : paceDiff < -5 ? "behind" : "on track";

  return { status, expectedPercent, actualPercent };
}

export function ProgressGoal({ businessId, goals: goalsProp }: ProgressGoalProps) {
  const [goals, setGoals] = useState<Goal[]>(goalsProp || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditId, setShowEditId] = useState<string | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // form state for create/edit
  const [form, setForm] = useState({ targetValue: 0, unit: "birr", estimatedEndDate: "", currentValue: 0, startDate: "" });

  useEffect(() => {
    if (goalsProp) {
      setGoals(goalsProp);
      return;
    }
    if (!businessId) return;
    let ignore = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/goal?businessId=${businessId}`);
        if (!res.ok) throw new Error("Failed to fetch goals");
        const data: Goal[] = await res.json();
        console.log("Fetched goalsssssssss:", data);
        if (!ignore) setGoals(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (!ignore) setError(e?.message || "Failed to load goals");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [businessId, goalsProp]);

  const content = useMemo(() => {
    if (loading) return <div>Loading goals...</div>;
    if (error) return <div className="text-sm text-red-600">{error}</div>;
    if (!goals.length) return <div className="text-sm text-muted-foreground">No goals yet.</div>;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-end">
          <button
            onClick={() => {
              setForm({ targetValue: 0, unit: "birr", estimatedEndDate: "", currentValue: 0, startDate: "" });
              setShowCreateModal(true);
            }}
            className="px-3 py-1 bg-primary text-white rounded text-sm"
          >
            Add New Goal
          </button>
        </div>
        {goals.map((g) => {
          const { status, expectedPercent, actualPercent } = computePace(g);
          const badgeClass =
            status === "ahead"
              ? "bg-emerald-100 text-emerald-700"
              : status === "behind"
              ? "bg-red-100 text-red-700"
              : status === "not started"
              ? "bg-gray-100 text-gray-700"
              : "bg-blue-100 text-blue-700"; // on track

          return (
            <div
              key={g._id || `${g.businessId}-${String(g.startDate)}-${String(g.estimatedEndDate)}`}
              className="p-3 border rounded"
            >
              <div className="flex items-center justify-between mb-2">
<div className="text-sm text-gray-800 mb-1">
                Target: {g.targetValue} {g.unit}
              </div>
                  <button
                    title="Edit"
                    onClick={() => {
                      setForm({
                        targetValue: g.targetValue,
                        unit: g.unit,
                        estimatedEndDate: toDate(g.estimatedEndDate).toISOString().slice(0, 10),
                        currentValue: g.currentValue,
                        startDate: toDate(g.startDate).toISOString().slice(0, 10),
                      });
                      setShowEditId(g._id || null);
                    }}
                    className="p-1 rounded hover:bg-slate-100"
                  >
                    <Edit2 size={16} />
                  </button>
              </div>


              

              <Progress value={actualPercent} />

              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <div>
                  Progress: {Math.round(g.currentValue)} / {g.targetValue} ({Math.round(actualPercent)}%)
                </div>
                <div>Expected: {Math.round(expectedPercent)}%</div>
              </div>
              <div className="flex items-center justify-between ">
                <div>
                You are <span className={`font-medium ${status === 'ahead' ? 'text-emerald-600' : status === 'behind' ? 'text-red-600' : 'text-blue-600'}`}>{status}</span> of your goal pace.
                </div>
              </div>
              
            
            </div>
          );
        })}
      </div>
    );
  }, [goals, loading, error]);

  // Create goal handler
  async function handleCreate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!businessId) {
      toast.error("No business id available");
      return;
    }
    setCreateLoading(true);
    try {
      const payload = {
        businessId,
        targetValue: Number(form.targetValue),
        unit: form.unit,
        startDate: form.startDate ? new Date(form.startDate).toISOString() : new Date().toISOString(),
        estimatedEndDate: form.estimatedEndDate,
      };
      const res = await fetch(`/api/goal`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create goal");
      toast.success("Goal created");
      const list = await fetch(`/api/goal?businessId=${businessId}`);
      const data: Goal[] = await list.json();
      setGoals(Array.isArray(data) ? data : []);
      setShowCreateModal(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to create goal");
    } finally {
      setCreateLoading(false);
    }
  }

  // Edit goal handler
  async function handleEdit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!showEditId) return;
    setEditLoading(true);
    try {
      // Only update currentValue from the edit modal
      const payload: any = { goalId: showEditId, currentValue: Number(form.currentValue) };

      const res = await fetch(`/api/goal`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update goal");
      toast.success("Goal updated");
      const list = await fetch(`/api/goal?businessId=${businessId}`);
      const data: Goal[] = await list.json();
      setGoals(Array.isArray(data) ? data : []);
      setShowEditId(null);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to update goal");
    } finally {
      setEditLoading(false);
    }
  }

  return (
    <div className="mb-6 md:mb-8">
      <h3 className="text-lg font-semibold mb-3">Goals</h3>
      {content}

      {/* Create modal (simple inline modal) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <form
            onSubmit={handleCreate}
            className="bg-white p-4 rounded shadow w-[320px]"
          >
            <h4 className="font-semibold mb-2">Create Goal</h4>
            <label className="block text-xs mb-1">Target value</label>
            <input
              type="number"
              value={form.targetValue}
              onChange={(e) => setForm((s) => ({ ...s, targetValue: Number(e.target.value) }))}
              className="w-full border px-2 py-1 rounded mb-2"
            />
            <label className="block text-xs mb-1">Unit</label>
            <select
              value={form.unit}
              onChange={(e) => setForm((s) => ({ ...s, unit: e.target.value }))}
              className="w-full border px-2 py-1 rounded mb-2"
            >
              <option value="birr">birr</option>
              <option value="audience">audience</option>
              <option value="customers">customers</option>
              <option value="sales">sales</option>
              <option value="tickets">tickets</option>
            </select>
            <label className="block text-xs mb-1">Start date</label>
            <input
              type="date"
              value={form.startDate || ""}
              onChange={(e) => setForm((s) => ({ ...s, startDate: e.target.value }))}
              className="w-full border px-2 py-1 rounded mb-2"
            />

            <label className="block text-xs mb-1">Estimated end date</label>
            <input
              type="date"
              value={form.estimatedEndDate}
              onChange={(e) => setForm((s) => ({ ...s, estimatedEndDate: e.target.value }))}
              className="w-full border px-2 py-1 rounded mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createLoading}
                className="px-3 py-1 bg-primary text-white rounded"
              >
                {createLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit modal */}
      {showEditId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <form onSubmit={handleEdit} className="bg-white p-4 rounded shadow w-[320px]">
            <h4 className="font-semibold mb-2">Update current value</h4>
            <label className="block text-xs mb-1">Current value</label>
            <input
              type="number"
              value={form.currentValue}
              min={form.currentValue}
              onChange={(e) => setForm((s) => ({ ...s, currentValue: Number(e.target.value) }))}
              className="w-full border px-2 py-1 rounded mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowEditId(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button type="submit" disabled={editLoading} className="px-3 py-1 bg-primary text-white rounded">
                {editLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProgressGoal;
