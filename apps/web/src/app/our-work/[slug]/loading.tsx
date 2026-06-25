export default function ProjectDetailLoading() {
  return (
    <div className="relative isolate overflow-hidden bg-[#fbf7ef] px-5 pb-24 pt-[9rem] sm:px-8 md:pt-[10rem] lg:pb-32">
      <div className="mx-auto max-w-[88rem]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-4 w-24 animate-pulse rounded bg-[#ede5d6]" />
          <div className="h-4 w-4 text-[#b99a54]">&rarr;</div>
          <div className="h-4 w-20 animate-pulse rounded bg-[#ede5d6]" />
          <div className="h-4 w-4 text-[#b99a54]">&rarr;</div>
          <div className="h-4 w-32 animate-pulse rounded bg-[#ede5d6]" />
        </div>

        <div className="mt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <div className="h-4 w-28 animate-pulse rounded bg-[#ede5d6]" />
            <div className="h-12 w-[32rem] max-w-full animate-pulse rounded bg-[#ede5d6]" />
          </div>
          <div className="flex gap-4">
            <div className="h-7 w-36 animate-pulse rounded-full bg-[#ede5d6]" />
            <div className="h-7 w-28 animate-pulse rounded-full bg-[#ede5d6]" />
          </div>
        </div>

        <div className="mt-12">
          <div className="aspect-[21/9] animate-pulse rounded-[20px] bg-[#ede5d6]" />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.4fr]">
          <div className="space-y-6">
            <div className="h-8 w-56 animate-pulse rounded bg-[#ede5d6]" />
            <div className="space-y-3">
              <div className="h-5 w-full animate-pulse rounded bg-[#ede5d6]" />
              <div className="h-5 w-full animate-pulse rounded bg-[#ede5d6]" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-[#ede5d6]" />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="aspect-[4/3] animate-pulse rounded-[14px] bg-[#ede5d6]" />
              <div className="aspect-[4/3] animate-pulse rounded-[14px] bg-[#ede5d6]" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-[16px] border border-[#dfcfaa]/60 bg-white/80 p-6">
              <div className="space-y-5">
                <div className="h-4 w-24 animate-pulse rounded bg-[#ede5d6]" />
                <div className="space-y-4">
                  <div className="h-5 w-20 animate-pulse rounded bg-[#ede5d6]" />
                  <div className="h-5 w-32 animate-pulse rounded bg-[#ede5d6]" />
                  <div className="h-5 w-24 animate-pulse rounded bg-[#ede5d6]" />
                </div>
              </div>
            </div>
            <div className="h-14 w-full animate-pulse rounded-full bg-[#ede5d6]" />
          </div>
        </div>
      </div>
    </div>
  );
}
