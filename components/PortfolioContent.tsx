import { AboutSection } from "./sections/AboutSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { ContactSection } from "./sections/ContactSection";
import { EducationSection } from "./sections/EducationSection";
import HeroSection from "./sections/HeroSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

async function PortfolioContent() {
	return (
		<>
			<HeroSection />
			<AboutSection />
			<TestimonialsSection />
			{/*<SkillsSection />*/}
			{/*<ExperienceSection />*/}
			<EducationSection />
			{/*<ProjectsSection />*/}
			<CertificationsSection />
			{/*<AchievementsSection />*/}
			<ServicesSection />
			{/*<BlogSection />*/}
			<ContactSection />
		</>
	);
}

export default PortfolioContent;
