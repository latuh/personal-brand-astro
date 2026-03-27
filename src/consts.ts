// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Aaron Mompié';
export const SITE_DESCRIPTION =
	'Software engineer and writer. Exploring ideas in public through code and essays.';

export const SITE_RESUME_URL = '/resume.pdf';
export const SITE_LINKEDIN_URL = 'https://www.linkedin.com/in/aaron-mompie/';
export const SITE_X_URL = 'https://x.com/arrrnmp';
export const SITE_INSTAGRAM_URL = 'https://instagram.com/arrrnmp';

export const CAROUSEL_ENABLED = true;

export interface Project {
	title: string;
	description: string;
	longDescription: string;
	techStack: string[];
	role: string;
	url?: string;
	github?: string;
}

export const PROJECTS: Project[] = [
	{
		title: 'Homelab Orchestration Platform',
		description:
			'Self-hosted infrastructure with automated provisioning and self-healing containers.',
		longDescription:
			'A fully self-hosted homelab running Proxmox and Docker with automated provisioning via Ansible. Includes container orchestration with health checks, automatic restarts, and centralized monitoring — designed to stay up without babysitting.',
		techStack: ['Proxmox', 'Docker', 'Ansible', 'Terraform', 'Bash'],
		role: 'Architect & Operator',
	},
	{
		title: 'Observability Pipeline',
		description:
			'Centralized logging and monitoring with real-time alerting and dashboards.',
		longDescription:
			'A unified observability stack that aggregates metrics, logs, and traces across all services. Built on Prometheus and Grafana with Loki for log aggregation, providing real-time alerting and historical dashboards for infrastructure health.',
		techStack: ['Prometheus', 'Grafana', 'Loki', 'Alertmanager', 'Docker'],
		role: 'Infrastructure Engineer',
	},
	{
		title: 'GitOps Deployment Engine',
		description:
			'Git-driven CI/CD pipeline with infrastructure-as-code and rollback capabilities.',
		longDescription:
			'An automated deployment pipeline where every infrastructure change flows through Git. Combines GitHub Actions with Terraform and Ansible to deliver repeatable, auditable deployments with one-command rollbacks when things go sideways.',
		techStack: ['GitHub Actions', 'Terraform', 'Ansible', 'Docker', 'Bash'],
		role: 'DevOps Engineer',
	},
	{
		title: 'Personal Site',
		description:
			'Statically generated personal brand site with a blog powered by content collections.',
		longDescription:
			'This site — built with Astro 5 and Tailwind CSS 4. Uses MDX-powered content collections for the blog, scroll-snap layouts, view transitions, and an image carousel. Optimized for performance with zero client-side JavaScript where it isn\'t needed.',
		techStack: ['Astro 5', 'Tailwind CSS 4', 'MDX', 'TypeScript'],
		role: 'Design & Development',
		url: 'https://aaronmompie.com',
	},
];
