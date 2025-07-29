"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Code,
    Palette,
    Smartphone,
    Server,
    Database,
    Globe,
    ChevronDown,
    Send,
    Star,
    Zap,
    Heart,
    Sparkles,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Portfolio() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isLoaded, setIsLoaded] = useState(false)
    const skillsRef = useRef<HTMLDivElement>(null)
    const projectsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIsLoaded(true)

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "about", "skills", "projects", "contact"]
            const scrollPosition = window.scrollY + 100

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const offsetTop = element.offsetTop
                    const offsetHeight = element.offsetHeight

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section)
                        break
                    }
                }
            }

            // Parallax effect for hero section
            const hero = document.getElementById("home")
            if (hero) {
                const scrolled = window.pageYOffset
                const parallax = hero.querySelector(".parallax-bg")
                if (parallax) {
                    ; (parallax as HTMLElement).style.transform = `translateY(${scrolled * 0.5}px)`
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
        setIsMenuOpen(false)
    }

    const skills = [
        { name: "HTML/CSS", level: 90, icon: Code, delay: 0 },
        { name: "JavaScript", level: 85, icon: Code, delay: 0.1 },
        { name: "React", level: 80, icon: Code, delay: 0.2 },
        { name: "Next.js", level: 75, icon: Globe, delay: 0.3 },
        { name: "Tailwind CSS", level: 85, icon: Palette, delay: 0.4 },
        { name: "Git/GitHub", level: 80, icon: Database, delay: 0.5 },
        { name: "Responsive Design", level: 90, icon: Smartphone, delay: 0.6 },
        { name: "Node.js", level: 70, icon: Server, delay: 0.7 },
    ]

    const projects = [
        {
            title: "Personal Blog Website",
            description:
                "A responsive blog website built with React and styled with Tailwind CSS. Features include dark mode, search functionality, and responsive design.",
            image: "/placeholder.svg?height=300&width=500",
            technologies: ["React", "Tailwind CSS", "JavaScript", "Responsive Design"],
            liveUrl: "#",
            githubUrl: "#",
            featured: true,
        },
        {
            title: "Todo List App",
            description:
                "An interactive todo application with local storage, drag-and-drop functionality, and beautiful animations. Perfect for daily task management.",
            image: "/placeholder.svg?height=300&width=500",
            technologies: ["HTML", "CSS", "JavaScript", "Local Storage"],
            liveUrl: "#",
            githubUrl: "#",
            featured: false,
        },
        {
            title: "Weather App",
            description:
                "A clean weather application that fetches real-time weather data using APIs. Includes location-based weather and 5-day forecasts.",
            image: "/placeholder.svg?height=300&width=500",
            technologies: ["React", "API Integration", "CSS Modules", "Responsive"],
            liveUrl: "#",
            githubUrl: "#",
            featured: true,
        },
        {
            title: "Portfolio Template",
            description:
                "A modern, responsive portfolio template for developers. Features smooth animations, contact forms, and optimized performance.",
            image: "/placeholder.svg?height=300&width=500",
            technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
            liveUrl: "#",
            githubUrl: "#",
            featured: false,
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blush-light to-white relative overflow-x-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                    <div className="shape shape-5"></div>
                </div>
            </div>

            {/* Cursor Follower */}
            <div
                className="cursor-follower"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                }}
            ></div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-blush-light shadow-lg nav-slide-down">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="text-2xl font-bold text-crimson logo-bounce">
                            <span className="inline-block">P</span>
                            <span className="inline-block">o</span>
                            <span className="inline-block">r</span>
                            <span className="inline-block">t</span>
                            <span className="inline-block">f</span>
                            <span className="inline-block">o</span>
                            <span className="inline-block">l</span>
                            <span className="inline-block">i</span>
                            <span className="inline-block">o</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8">
                            {["home", "about", "skills", "projects", "contact"].map((section, index) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className={`capitalize transition-all duration-300 hover:text-crimson nav-item ${activeSection === section ? "text-crimson font-medium scale-110" : "text-gray-600"
                                        }`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {section}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <div className={`hamburger ${isMenuOpen ? "active" : ""}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className={`md:hidden mobile-menu ${isMenuOpen ? "active" : ""}`}>
                        {["home", "about", "skills", "projects", "contact"].map((section, index) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className="block w-full text-left py-3 capitalize text-gray-600 hover:text-crimson transition-colors mobile-nav-item"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {section}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative">
                <div className="parallax-bg absolute inset-0 opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className={`hero-content ${isLoaded ? "loaded" : ""}`}>
                        <div className="mb-8 profile-container">
                            <div className="profile-wrapper">
                                <Image
                                    src="/placeholder.svg?height=200&width=200"
                                    alt="Profile picture"
                                    width={200}
                                    height={200}
                                    className="profile-image"
                                />
                                <div className="profile-ring"></div>
                                <div className="profile-glow"></div>
                            </div>
                        </div>

                        <div className="text-reveal">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-crimson hero-title">
                                <span className="inline-block">Frontend</span>{" "}
                                <span className="inline-block text-gradient">Developer</span>
                            </h1>
                        </div>

                        <div className="text-reveal" style={{ animationDelay: "0.3s" }}>
                            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                                Passionate about creating beautiful, responsive web experiences with modern technologies
                            </p>
                        </div>

                        <div className="text-reveal" style={{ animationDelay: "0.6s" }}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                <Button size="lg" onClick={() => scrollToSection("projects")} className="btn-primary group">
                                    <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                                    View My Work
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => scrollToSection("contact")}
                                    className="btn-secondary group"
                                >
                                    <Heart className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                                    Get In Touch
                                </Button>
                            </div>
                        </div>

                        <div className="text-reveal" style={{ animationDelay: "0.9s" }}>
                            <div className="flex justify-center space-x-6">
                                <Link href="#" className="social-link">
                                    <Github size={24} />
                                </Link>
                                <Link href="#" className="social-link">
                                    <Linkedin size={24} />
                                </Link>
                                <Link href="#" className="social-link">
                                    <Mail size={24} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="scroll-indicator">
                        <ChevronDown size={32} className="animate-bounce text-crimson" />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="section-title">About Me</h2>
                        <div className="section-divider"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 about-text">
                            <p className="text-lg text-gray-600 leading-relaxed slide-in-left">
                                I'm a passionate and dedicated frontend developer who recently embarked on this exciting journey into
                                web development. With a strong foundation in modern web technologies, I love bringing creative designs
                                to life through clean, efficient code.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed slide-in-left" style={{ animationDelay: "0.2s" }}>
                                My journey started with curiosity about how websites work, and it quickly evolved into a passion for
                                creating user-friendly, accessible, and visually appealing web applications. I'm constantly learning and
                                staying up-to-date with the latest trends and best practices in frontend development.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed slide-in-left" style={{ animationDelay: "0.4s" }}>
                                When I'm not coding, you can find me exploring new design trends, contributing to open-source projects,
                                or learning about emerging technologies. I believe in continuous learning and am always excited to take
                                on new challenges.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <Card className="stat-card" style={{ animationDelay: "0.1s" }}>
                                <CardContent className="pt-6 text-center">
                                    <div className="text-3xl font-bold text-crimson mb-2 counter" data-target="15">
                                        0
                                    </div>
                                    <div className="text-gray-600">Projects Completed</div>
                                </CardContent>
                            </Card>
                            <Card className="stat-card" style={{ animationDelay: "0.2s" }}>
                                <CardContent className="pt-6 text-center">
                                    <div className="text-3xl font-bold text-crimson mb-2 counter" data-target="1">
                                        0
                                    </div>
                                    <div className="text-gray-600">Year Learning</div>
                                </CardContent>
                            </Card>
                            <Card className="stat-card" style={{ animationDelay: "0.3s" }}>
                                <CardContent className="pt-6 text-center">
                                    <div className="text-3xl font-bold text-crimson mb-2 counter" data-target="8">
                                        0
                                    </div>
                                    <div className="text-gray-600">Technologies</div>
                                </CardContent>
                            </Card>
                            <Card className="stat-card" style={{ animationDelay: "0.4s" }}>
                                <CardContent className="pt-6 text-center">
                                    <div className="text-3xl font-bold text-crimson mb-2">∞</div>
                                    <div className="text-gray-600">Passion</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 bg-gradient-to-br from-blush-light to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Skills & Technologies</h2>
                        <div className="section-divider"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" ref={skillsRef}>
                        {skills.map((skill, index) => {
                            const IconComponent = skill.icon
                            return (
                                <Card key={skill.name} className="skill-card group" style={{ animationDelay: `${skill.delay}s` }}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center mb-4">
                                            <div className="skill-icon-wrapper">
                                                <IconComponent className="w-8 h-8 text-crimson skill-icon" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 ml-3">{skill.name}</h3>
                                        </div>
                                        <div className="skill-progress-container">
                                            <div className="skill-progress-bg">
                                                <div
                                                    className="skill-progress-fill"
                                                    style={
                                                        {
                                                            "--skill-level": `${skill.level}%`,
                                                            animationDelay: `${skill.delay + 0.5}s`,
                                                        } as React.CSSProperties
                                                    }
                                                ></div>
                                            </div>
                                            <div className="skill-percentage">{skill.level}%</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Featured Projects</h2>
                        <div className="section-divider"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8" ref={projectsRef}>
                        {projects.map((project, index) => (
                            <Card
                                key={project.title}
                                className={`project-card group ${project.featured ? "featured" : ""}`}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className="project-image-container">
                                    <Image
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        width={500}
                                        height={300}
                                        className="project-image"
                                    />
                                    <div className="project-overlay">
                                        <div className="project-links">
                                            <Link href={project.liveUrl} className="project-link">
                                                <ExternalLink size={20} />
                                                <span>Live Demo</span>
                                            </Link>
                                            <Link href={project.githubUrl} className="project-link">
                                                <Github size={20} />
                                                <span>Code</span>
                                            </Link>
                                        </div>
                                    </div>
                                    {project.featured && (
                                        <div className="featured-badge">
                                            <Star size={16} />
                                            <span>Featured</span>
                                        </div>
                                    )}
                                </div>

                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-crimson transition-colors">
                                        {project.title}
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">{project.description}</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, techIndex) => (
                                            <Badge key={tech} className="tech-badge" style={{ animationDelay: `${techIndex * 0.1}s` }}>
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gradient-to-br from-blush-light to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Let's Work Together</h2>
                        <div className="section-divider"></div>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
                            I'm always excited to work on new projects and collaborate with amazing people!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8 contact-info">
                            <div className="slide-in-left">
                                <h3 className="text-2xl font-bold mb-6 text-gray-900">Get In Touch</h3>
                                <div className="space-y-4">
                                    <div className="contact-item">
                                        <Mail className="w-6 h-6 text-crimson" />
                                        <span className="text-gray-600">hello@example.com</span>
                                    </div>
                                    <div className="contact-item">
                                        <Github className="w-6 h-6 text-crimson" />
                                        <span className="text-gray-600">github.com/username</span>
                                    </div>
                                    <div className="contact-item">
                                        <Linkedin className="w-6 h-6 text-crimson" />
                                        <span className="text-gray-600">linkedin.com/in/username</span>
                                    </div>
                                </div>
                            </div>

                            <div className="slide-in-left" style={{ animationDelay: "0.2s" }}>
                                <h4 className="text-lg font-semibold mb-4 text-gray-900">What I'm Looking For</h4>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center">
                                        <Zap className="w-4 h-4 text-crimson mr-2" />
                                        Entry-level Frontend Positions
                                    </li>
                                    <li className="flex items-center">
                                        <Zap className="w-4 h-4 text-crimson mr-2" />
                                        Freelance Projects
                                    </li>
                                    <li className="flex items-center">
                                        <Zap className="w-4 h-4 text-crimson mr-2" />
                                        Collaboration Opportunities
                                    </li>
                                    <li className="flex items-center">
                                        <Zap className="w-4 h-4 text-crimson mr-2" />
                                        Mentorship & Learning
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <Card className="contact-form-card slide-in-right">
                            <CardHeader>
                                <CardTitle>Send a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="form-group">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" placeholder="Your name" className="form-input" />
                                        </div>
                                        <div className="form-group">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="your@email.com" className="form-input" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="Let's collaborate!" className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell me about your project or opportunity..."
                                            rows={5}
                                            className="form-input"
                                        />
                                    </div>
                                    <Button className="btn-primary w-full group">
                                        <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
                <div className="footer-bg"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <div className="text-2xl font-bold mb-4 text-crimson footer-logo">Portfolio</div>
                        <p className="text-gray-400 mb-6">Building the future, one line of code at a time.</p>
                        <div className="flex justify-center space-x-6 mb-8">
                            <Link href="#" className="footer-social-link">
                                <Github size={24} />
                            </Link>
                            <Link href="#" className="footer-social-link">
                                <Linkedin size={24} />
                            </Link>
                            <Link href="#" className="footer-social-link">
                                <Mail size={24} />
                            </Link>
                        </div>
                        <div className="border-t border-gray-800 pt-8">
                            <p className="text-gray-400">© {new Date().getFullYear()} Portfolio. Made with ❤️ and lots of ☕</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
