import Link from "next/link";
import { defineQuery } from "next-sanity";
import WorldMapDemo from "@/components/world-map-demo";
import { sanityFetch } from "@/sanity/lib/live";
import { Icon } from "../Icon";
import { ContactForm } from "./ContactForm";

const PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  email,
  phone,
  location,
  socialLinks
}`);

export async function ContactSection() {
	const { data: profile } = await sanityFetch({ query: PROFILE_QUERY });

	if (!profile) {
		return null;
	}

	return (
		<section id="contact" className="py-20 px-6 pb-40 bg-muted/10">
			<WorldMapDemo />

			<div className="container mx-auto max-w-4xl">
				<div className="text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						Entre em contato
						{/* Ícone Claro */}
						<Icon
							src="/info.png"
							alt="Disponibilidade"
							className="w-8 h-8 inline-block relative -bottom-[1.5px] -right-[2px] ml-2 dark:hidden responsive_icon_contact"
						/>
						{/* Ícone Escuro */}
						<Icon
							src="/info_rose.png"
							alt="Disponibilidade"
							className="w-8 h-8 hidden relative -bottom-[1.5px] -right-[2px] dark:inline-block  ml-2 responsive_icon_contact"
						/>
					</h2>
					<p className="text-xl text-muted-foreground">
						Onde quer que você esteja no mundo, vamos colaborar no seu próximo
						projeto.
					</p>
				</div>

				<div className="@container">
					<div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8">
						{/* Contact Info */}
						<div className="@container/info space-y-6">
							<h3 className="text-xl @md/info:text-2xl font-semibold mb-6">
								Informações de contato
							</h3>

							{profile.email && (
								<div className="flex items-start gap-3 @md/info:gap-4">
									<div className="w-10 h-10 @md/info:w-12 @md/info:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
										<span className="text-xl @md/info:text-2xl">
											{/* Ícone Claro */}
											<Icon
												src="/correspondencia.png"
												alt="Disponibilidade"
												className="w-8 h-8 inline-block relative -bottom-[3px] right-[3.02px] ml-2 dark:hidden reponsive_icon"
											/>

											{/* Ícone Escuro */}
											<Icon
												src="/correspondencia_rose.png"
												alt="Disponibilidade"
												className="w-8 h-8 hidden relative -bottom-[3px] right-[3.02px] dark:inline-block  ml-2 reponsive_icon"
											/>
										</span>
									</div>
									<div className="min-w-0 relative -top-[19px]">
										<h4 className="font-semibold mb-1 text-sm @md/info:text-base">
											Email
										</h4>
										<Link
											href={`mailto:${profile.email}`}
											className="text-muted-foreground hover:text-primary transition-colors text-xs @md/info:text-sm truncate block"
										>
											{profile.email}
										</Link>
									</div>
								</div>
							)}

							{profile.phone && (
								<div className="flex items-start gap-3 @md/info:gap-4">
									<div className="w-10 h-10 @md/info:w-12 @md/info:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
										<span className="text-xl @md/info:text-2xl">
											{/* Ícone Claro */}
											<Icon
												src="/telefone.png"
												alt="Disponibilidade"
												className="w-7 h-7 inline-block relative -bottom-[4px] right-[3.8px] ml-2 dark:hidden reponsive_icon"
											/>

											{/* Ícone Escuro */}
											<Icon
												src="/telefone_rose.png"
												alt="Disponibilidade"
												className="w-7 h-7 hidden relative -bottom-[4px] right-[3.8px] dark:inline-block  ml-2 reponsive_icon"
											/>
										</span>
									</div>
									<div className="min-w-0 relative -top-[19px]">
										<h4 className="font-semibold mb-0 text-sm @md/info:text-base">
											Telefone
										</h4>
										<Link
											href={`tel:${profile.phone}`}
											className="text-muted-foreground hover:text-primary transition-colors text-xs @md/info:text-sm"
										>
											{profile.phone}
										</Link>
									</div>
								</div>
							)}

							{/*profile.location && (
                <div className="flex items-start gap-3 @md/info:gap-4">
                  <div className="w-10 h-10 @md/info:w-12 @md/info:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xl @md/info:text-2xl">📍</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold mb-1 text-sm @md/info:text-base">
                      Localização
                    </h4>
                    <p className="text-muted-foreground text-xs @md/info:text-sm">
                      {profile.location}
                    </p>
                  </div>
                </div>
              )*/}

							{/*profile.socialLinks && (
                <div className="pt-6">
                  <h4 className="font-semibold mb-4 text-sm @md/info:text-base">
                    Me siga
                  </h4>
                  <div className="flex flex-wrap gap-2 @md/info:gap-3">
                    {profile.socialLinks.github && (
                      <Link
                        href={profile.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm"
                      >
                        GitHub
                      </Link>
                    )}
                    {profile.socialLinks.linkedin && (
                      <Link
                        href={profile.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm"
                      >
                        LinkedIn
                      </Link>
                    )}
                    {profile.socialLinks.twitter && (
                      <Link
                        href={profile.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm"
                      >
                        Twitter
                      </Link>
                    )}
                    {profile.socialLinks.website && (
                      <Link
                        href={profile.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm"
                      >
                        Website
                      </Link>
                    )}
                    {profile.socialLinks.medium && (
                      <Link
                        href={profile.socialLinks.medium}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm"
                      >
                        Medium
                      </Link>
                    )}
                    {profile.socialLinks.devto && (
                      <Link
                        href={profile.socialLinks.devto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm"
                      >
                        Dev.to
                      </Link>
                    )}
                    {profile.socialLinks.youtube && (
                      <Link
                        href={profile.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm"
                      >
                        YouTube
                      </Link>
                    )}
                  </div>
                </div>
              )*/}
						</div>

						{/* Contact Form */}
						<ContactForm />
					</div>
				</div>
			</div>
		</section>
	);
}
