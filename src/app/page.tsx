import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const skills = [
	"Technical Leadership",
	"System Architecture",
	"AI Integration",
	"React / TypeScript",
	"Full-Stack Engineering",
	"Design Systems",
	"Product Ownership",
	"Activation & Growth",
	"Node.js / GraphQL",
	"Observability",
	"Testing / CI/CD",
	"Accessibility",
];

const caseStudies = [
	{
		name: "Ledger",
		slug: "ledger",
		description: "Auditable project management & knowledge base",
		tags: ["Desktop", "Mobile", "Collab", "Auditing"],
		accent: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
		accentBorder: "border-amber-500/20",
		accentDot: "bg-amber-500",
		hoverBg: "hover:bg-amber-500/10 focus-within:bg-amber-500/10 hover:border-amber-500/10 focus-within:border-amber-500/10",
	},
	{
		name: "Ritual",
		slug: "ritual",
		description: "Structured, time-bound social connections",
		tags: ["Mobile", "Dating", "Dark Mode", "Social"],
		accent: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
		accentBorder: "border-purple-500/20",
		accentDot: "bg-purple-500",
		hoverBg: "hover:bg-purple-500/10 focus-within:bg-purple-500/10 hover:border-purple-500/10 focus-within:border-purple-500/10",
	},
	{
		name: "Circles",
		slug: "circles",
		description: "Relationship maintenance & personal CRM",
		tags: ["Mobile", "Productivity", "Minimal", "Personal"],
		accent: "bg-teal-500/10 text-teal-700 dark:text-teal-400",
		accentBorder: "border-teal-500/20",
		accentDot: "bg-teal-500",
		hoverBg: "hover:bg-teal-500/10 focus-within:bg-teal-500/10 hover:border-teal-500/10 focus-within:border-teal-500/10",
	},
];

export default function Home() {
	return (
		<div className="mx-auto max-w-3xl px-12 py-10 md:px-16 md:py-12 lg:max-w-6xl">
			<div className="flex flex-col gap-16">
				{/* Left column: Hero + Expertise */}
				<div className="items-start lg:items-end flex flex-col lg:flex-row gap-12">
					{/* Hero */}
					<section>
						<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
							Lucas Castro
						</h1>
						<p className="mt-2 text-xl text-muted-foreground sm:text-2xl">
							Product Engineer • AI Wrangler
						</p>
						<p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
							Former designer — current UX-centric software engineer. I build scalable systems and lead cross-functional teams. Now architecting AI-native products, integrating RAG and multi-modal LLM flows, and focusing on the intersection of AI-based productivity and creativity.
						</p>
					</section>

					{/* Skills */}
					<section className="items-end flex-1 lg:min-w-[420]">
						<h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
							Expertise
						</h2>
						<div className="flex flex-wrap gap-1.5">
							{skills.map((skill) => (
								<Badge
									key={skill}
									variant="secondary"
									className="font-normal"
								>
									{skill}
								</Badge>
							))}
						</div>
					</section>
				</div>

				{/* Right column: Case Studies */}
				<div className="flex">
					<section className="flex flex-col flex-1">
						<h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
							Case Studies
						</h2>
						<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 sm:gap-6">
							{caseStudies.map((study) => (
								<Link key={study.slug} href={`/case-studies/${study.slug}`}>
									<Card
										className={`group border py-6 ${study.accentBorder} ${study.hoverBg} h-full transition-all duration-200 hover:shadow-md`}
									>
										<CardHeader className="pb-3">
											<div className="flex items-center gap-3">
												<div
													className={`h-2.5 w-2.5 rounded-full ${study.accentDot} group-hover:bg-black`}
												/>
												<CardTitle className="text-lg group-hover:text-black">{study.name}</CardTitle>
											</div>
											<CardDescription className="mt-1 pl-[22px] group-hover:text-black/70">
												{study.description}
											</CardDescription>
										</CardHeader>
										<CardContent className="flex items-center justify-between gap-6">
											<div className="flex flex-wrap gap-1.5">
												{study.tags.map((tag) => (
													<Badge
														key={tag}
														variant="outline"
														className={`${study.accent} border-0 font-normal`}
													>
														{tag}
													</Badge>
												))}
											</div>
											<Button
												variant="ghost"
												size="sm"
												className="text-muted-foreground group-hover:text-black"
												tabIndex={-1}
											>
												View
												<ArrowRight className="ml-1 h-3.5 w-3.5" />
											</Button>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
