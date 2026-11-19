export interface Milestone {
  id: string;
  date: string;
  title: string;
  category: 'awareness' | 'workshop' | 'supervisor' | 'taf' | 'charter' | 'proposal' | 'progress';
  position: 'top' | 'bottom';
  color: string; // Tailwind border/badge accent color
  badgeBg: string;
  dotColor: string;
  shortDescription: string;
  detailedRequirements: string[];
  tips: string[];
  deadlineStatus: 'completed' | 'urgent' | 'upcoming';
  isoDate: string; // for countdown/sorting
  annotation?: string; // handwritten notes like "(4)", "mid term", "600-2000 words"
}

export const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    date: '30 Sep 2026',
    title: 'RP Awareness Session',
    category: 'awareness',
    position: 'top',
    color: '#8b5cf6', // purple
    badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-300',
    dotColor: 'bg-purple-600',
    shortDescription: 'Introductory orientation on research project scope, faculty expectations, and team requirements.',
    detailedRequirements: [
      'Understand project guidelines and marking schemes (IT4010 Research Project).',
      'Begin scouting prospective group members (groups of 4).',
      'Brainstorm preliminary domains: AI/ML, Cloud/DevOps, Cybersec, IoT, or Software Engineering.'
    ],
    tips: [
      'Form team early — the strongest teams do not wait for the semester to begin!',
      'Review previous years research publications and project repositories.'
    ],
    deadlineStatus: 'upcoming',
    isoDate: '2026-09-30',
    annotation: 'Group scout & orientation'
  },
  {
    id: 'm2',
    date: '11 & 18 Oct',
    title: 'Design Thinking Workshop',
    category: 'workshop',
    position: 'bottom',
    color: '#0d9488', // teal
    badgeBg: 'bg-teal-500/10 border-teal-500/30 text-teal-600 dark:text-teal-300',
    dotColor: 'bg-teal-600',
    shortDescription: 'Hands-on workshops to identify problem spaces, empathy mapping, and user need validation.',
    detailedRequirements: [
      'Attend both Workshop Sessions (11 Oct & 18 Oct).',
      'Frame a validated, impactful research problem statement.',
      'Produce initial problem definition drafts (approx. 400 - 2000 words background synthesis).'
    ],
    tips: [
      'Ensure the problem is real and backed by peer-reviewed literature.',
      'Differentiate between an engineering solution vs. a research contribution.'
    ],
    deadlineStatus: 'upcoming',
    isoDate: '2026-10-18',
    annotation: 'G1 / 400-2000 words synthesis'
  },
  {
    id: 'm3',
    date: '30 Oct',
    title: 'Supervisor Confirmation',
    category: 'supervisor',
    position: 'top',
    color: '#f59e0b', // amber
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-300',
    dotColor: 'bg-amber-500',
    shortDescription: 'Formal agreement and sign-off from an academic supervisor and co-supervisor.',
    detailedRequirements: [
      'Pitch research topic and novelty slides to potential faculty supervisors.',
      'Obtain written acceptance from Supervisor and Co-supervisor.',
      'Solidify 4-member group commitments and allocation of individual research components.'
    ],
    tips: [
      'Reach out early with a 1-page proposal summary and recent paper references.',
      'Popular supervisors get booked out quickly!'
    ],
    deadlineStatus: 'upcoming',
    isoDate: '2026-10-30',
    annotation: 'Crucial: 4 members lock-in'
  },
  {
    id: 'm4',
    date: '10 Dec',
    title: 'TAF Submission',
    category: 'taf',
    position: 'bottom',
    color: '#f43f5e', // rose / red
    badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-300',
    dotColor: 'bg-rose-600',
    shortDescription: 'Topic Assessment Form (TAF) formal document submission to the department committee.',
    detailedRequirements: [
      'Finalize Title, Objectives, Problem Statement, and Proposed Methodology.',
      'Detail individual contributions for each of the 4 team members.',
      'Collect supervisor endorsements and upload before deadline.'
    ],
    tips: [
      'Immediate milestone target! Do not wait for the semester to begin.',
      'Make sure each individual scope is balanced and academically sound.'
    ],
    deadlineStatus: 'urgent',
    isoDate: '2026-12-10',
    annotation: 'Immediate Target before Jan'
  },
  {
    id: 'm5',
    date: '14–16 Dec',
    title: 'TAF Evaluation',
    category: 'taf',
    position: 'top',
    color: '#0284c7', // sky blue
    badgeBg: 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-300',
    dotColor: 'bg-sky-600',
    shortDescription: 'Review and oral defense/screening of the submitted TAF with the evaluation panel.',
    detailedRequirements: [
      'Defend research novelty, feasibility, and technical depth before faculty panel.',
      'Receive approval status (Accepted / Revisions required / Resubmit).',
      'Integrate reviewer comments immediately.'
    ],
    tips: [
      'Be prepared to justify why your project is research and not just standard web/mobile dev.',
      'Prepare crisp 5-minute explanation per member.'
    ],
    deadlineStatus: 'upcoming',
    isoDate: '2026-12-16',
    annotation: 'Panel Defense & Approval'
  },
  {
    id: 'm6',
    date: '04 Jan 2027',
    title: 'Project Charter',
    category: 'charter',
    position: 'bottom',
    color: '#10b981', // emerald
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-300',
    dotColor: 'bg-emerald-500',
    shortDescription: 'Comprehensive contractual charter outlining scope, milestones, Gantt chart, and risk plan.',
    detailedRequirements: [
      'Complete SLIIT IT4010 Project Charter document.',
      'Define detailed timeline, milestones, sprint deliverables, and resource requirements.',
      'Finalize signed agreement between group and supervisors.'
    ],
    tips: [
      'Use this charter as your team guide throughout the entire year.',
      'Establish clear team communication protocols and git workflow.'
    ],
    deadlineStatus: 'upcoming',
    isoDate: '2027-01-04',
    annotation: 'Formal Project Baseline'
  },
  {
    id: 'm7',
    date: '04–08 Mar',
    title: 'Proposal Presentation',
    category: 'proposal',
    position: 'top',
    color: '#7c3aed', // violet
    badgeBg: 'bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-300',
    dotColor: 'bg-violet-600',
    shortDescription: 'Formal mid-term proposal viva and presentation evaluated by examiner panel.',
    detailedRequirements: [
      'Comprehensive 15-20 min presentation detailing problem, literature review, and architecture.',
      'Demo preliminary feasibility proofs, datasets, or mockups.',
      'Answer rigorous questions on methodology and individual contributions.'
    ],
    tips: [
      'Practice slide transitions as a group with strict timing.',
      'Anticipate critical questions about your baseline dataset and evaluation metrics.'
    ],
    deadlineStatus: 'upcoming',
    isoDate: '2027-03-08',
    annotation: 'Mid-term Presentation Viva'
  },
  {
    id: 'm8',
    date: '15 Mar',
    title: 'Proposal Report',
    category: 'proposal',
    position: 'bottom',
    color: '#f97316', // orange
    badgeBg: 'bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-300',
    dotColor: 'bg-orange-500',
    shortDescription: 'Submission of the thorough Research Proposal documentation with IEEE citations.',
    detailedRequirements: [
      'Submit individual and group chapters following IEEE standard formatting.',
      'Include comprehensive Literature Review (20+ high impact IEEE/Springer papers).',
      'System Architecture, Requirements, and Detailed Methodology chapters.'
    ],
    tips: [
      'Run Turnitin plagiarism checks in advance (keep similarity index strictly below threshold).',
      'Have supervisor review drafts at least 1 week before submission.'
    ],
    deadlineStatus: 'upcoming',
    isoDate: '2027-03-15',
    annotation: 'Full Written Documentation'
  },
  {
    id: 'm9',
    date: '29 Apr–03 May',
    title: 'Progress Presentation 1',
    category: 'progress',
    position: 'top',
    color: '#06b6d4', // cyan
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-300',
    dotColor: 'bg-cyan-600',
    shortDescription: 'First core milestone presentation showcasing 40-50% actual implementation & findings.',
    detailedRequirements: [
      'Demonstrate working code / core models / functional components.',
      'Present preliminary evaluation results and performance metrics.',
      'Show evidence of regular supervisor meetings (logbook verification).'
    ],
    tips: [
      'Live demos carry much more weight than static screenshots.',
      'Highlight individual member progress distinctly.'
    ],
    deadlineStatus: 'upcoming',
    isoDate: '2027-05-03',
    annotation: '40-50% Working Implementation'
  }
];
