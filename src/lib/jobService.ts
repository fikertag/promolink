import Job from "@/models/JobSchema";
import Goal from "@/models/Goal";

export async function completeJob(jobId: string) {
  const job = await Job.findById(jobId);
  if (!job) throw new Error("Job not found");

  job.status = "completed";
  await job.save();

  if (job.goalId) {
    const contribution = job.price * (job.goalContributionPercent / 100);
    await Goal.findByIdAndUpdate(
      job.goalId,
      { $inc: { currentValue: contribution } },
      { new: true }
    );
  }

  return job;
}
