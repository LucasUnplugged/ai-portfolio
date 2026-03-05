import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function LedgerCaseStudy() {
	return (
		<div className="mx-auto max-w-4xl px-12 py-10 md:px-16 md:py-12">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
					Ledger
				</h1>
				<p className="mt-2 text-lg text-muted-foreground">
					Auditable project management &amp; knowledge base
				</p>
				<div className="mt-4 flex flex-wrap gap-1.5">
					<Badge
						variant="outline"
						className="border-0 bg-amber-500/10 font-normal text-amber-700 dark:text-amber-400"
					>
						Desktop
					</Badge>
					<Badge
						variant="outline"
						className="border-0 bg-amber-500/10 font-normal text-amber-700 dark:text-amber-400"
					>
						Mobile
					</Badge>
					<Badge
						variant="outline"
						className="border-0 bg-amber-500/10 font-normal text-amber-700 dark:text-amber-400"
					>
						Collab
					</Badge>
					<Badge
						variant="outline"
						className="border-0 bg-amber-500/10 font-normal text-amber-700 dark:text-amber-400"
					>
						Auditing
					</Badge>
				</div>
			</div>

			<Separator className="mb-8" />

			{/* Concept */}
			<section className="mb-10">
				<h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
					The Concept
				</h2>
				<p className="leading-relaxed text-foreground">
					Every document, task, project, and decision gets full version tracking
					— every change logged, every version recoverable. Ledger is built for
					teams that need compliance-grade auditing without sacrificing speed.
					Iterate boldly, ship fast, and never worry about losing history.
					Nothing is lost, so nothing holds you back.
				</p>
			</section>

			{/* Goals */}
			<section className="mb-10">
				<h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
					Design Goals
				</h2>
				<ul className="list-inside list-disc space-y-2 text-foreground">
					<li>Desktop-first layout with information-dense views</li>
					<li>
						Real-time collaborative patterns — cursors, presence, live edits
					</li>
					<li>Complex data views: tables, kanban boards, timeline views</li>
					<li>Sophisticated information architecture without visual clutter</li>
				</ul>
			</section>

			{/* Approach */}
			<section className="mb-12">
				<h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
					Design Approach
				</h2>
				<p className="leading-relaxed text-foreground">
					The warm amber palette keeps a serious tool feeling approachable —
					inviting rather than cold or sterile. Information density is
					intentional: power users scanning audit logs and change histories need
					everything visible at a glance. A clear visual hierarchy guides
					attention through complex data, surfacing what matters without burying
					context.
				</p>
			</section>

			{/* CTA */}
			<div className="flex items-center gap-4">
				<Button asChild size="lg">
					<Link href="/app/ledger">
						Launch Demo
						<ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</Button>
				<span className="text-sm text-muted-foreground">
					Interactive prototype
				</span>
			</div>
		</div>
	);
}
