import { Project, Todo, Note, Reminder } from '../types';


export const sampleData = {
  projects: [
    {
      id: 1,
      title: "Website Redesign",
      description: "Complete overhaul of company website with modern design and improved UX",
      status: "in-progress",
      date: new Date("2024-03-15"),
      color: "from-blue-500 to-blue-600",
      notes: [1, 2, 3],
      todos: [1, 2, 3, 4, 5]
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Cross-platform mobile app using React Native with offline-first architecture",
      status: "not-started",
      date: new Date("2024-04-01"),
      color: "from-purple-500 to-purple-600",
      notes: [4, 5],
      todos: [6, 7, 8]
    },
    {
      id: 3,
      title: "Q2 Marketing Campaign",
      description: "Comprehensive digital marketing campaign across multiple channels",
      status: "completed",
      date: new Date("2024-02-28"),
      color: "from-emerald-500 to-emerald-600",
      notes: [6],
      todos: [9, 10]
    }
  ] as Project[],

  todos: [
    {
      id: 1,
      title: "Create wireframes in Figma",
      completed: true,
      priority: "high",
      dueDate: new Date("2024-03-20"),
      projectId: 1
    },
    {
      id: 2,
      title: "Implement responsive design system",
      completed: false,
      priority: "high",
      dueDate: new Date("2024-03-25"),
      projectId: 1
    },
    {
      id: 3,
      title: "Optimize images and assets",
      completed: false,
      priority: "medium",
      dueDate: new Date("2024-03-28"),
      projectId: 1
    },
    {
      id: 4,
      title: "Set up CI/CD pipeline",
      completed: false,
      priority: "high",
      dueDate: new Date("2024-03-30"),
      projectId: 1
    },
    {
      id: 5,
      title: "Write documentation",
      completed: false,
      priority: "medium",
      dueDate: new Date("2024-04-05"),
      projectId: 1
    },
    // More todos for other projects...
  ] as Todo[],

  notes: [
    {
      id: 1,
      title: "Design System Guidelines",
      content: "# Brand Colors\n- Primary: #3B82F6\n- Secondary: #8B5CF6\n- Accent: #10B981\n\n# Typography\n- Headings: Geist Sans\n- Body: Inter\n\n# Components\n- Use rounded corners (border-radius: 12px)\n- Implement smooth transitions\n- Follow accessibility guidelines",
      category: "work",
      projectId: 1,
      date: new Date("2024-03-16"),
      color: "bg-blue-100"
    },
    {
      id: 2,
      title: "Client Meeting Notes",
      content: "## Key Requirements\n\n1. Modern, minimalist design\n2. Fast loading times\n3. Mobile-first approach\n4. Integration with existing CMS\n5. Analytics dashboard\n\n## Timeline\n- Design: 2 weeks\n- Development: 6 weeks\n- Testing: 2 weeks\n- Launch: April 15th",
      category: "work",
      projectId: 1,
      date: new Date("2024-03-17"),
      color: "bg-purple-100"
    },
    // More detailed notes...
  ] as Note[],

  reminders: [
    {
      id: 1,
      title: "Weekly Team Sync",
      datetime: "2024-03-20T10:00",
      description: "Review progress on website redesign project\n- UI/UX updates\n- Performance metrics\n- Timeline review",
      completed: false,
      recurring: "weekly",
      priority: "high"
    },
    {
      id: 2,
      title: "Client Presentation",
      datetime: "2024-03-25T14:00",
      description: "Present website redesign progress\n- Show mockups\n- Discuss feedback\n- Plan next steps",
      completed: false,
      recurring: "none",
      priority: "high"
    },
    // More reminders...
  ] as Reminder[]
}; 