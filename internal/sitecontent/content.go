package sitecontent

type Field struct {
	Key         string
	Label       string
	InputType   string
	Default     string
	Placeholder string
	HelpText    string
	Rows        int
}

type Page struct {
	Slug        string
	Title       string
	Description string
	Fields      []Field
}

func Definitions() []Page {
	return []Page{
		{
			Slug:        "home",
			Title:       "Home",
			Description: "Core homepage messaging shown above the fold and in the main CTA areas.",
			Fields: []Field{
				{Key: "home.hero.title_line_1", Label: "Hero Title Line 1", InputType: "text", Default: "Industrial"},
				{Key: "home.hero.title_line_2", Label: "Hero Title Line 2", InputType: "text", Default: "Precision"},
				{Key: "home.hero.body", Label: "Hero Description", InputType: "textarea", Rows: 3, Default: "Mold repair, custom fixtures, EOAT tooling, and CNC machining for manufacturers who demand precision."},
				{Key: "home.services.heading", Label: "Services Heading", InputType: "text", Default: "What We Do"},
				{Key: "home.services.body", Label: "Services Intro", InputType: "textarea", Rows: 3, Default: "Comprehensive machining and tooling solutions for plastic injection molding and manufacturing."},
				{Key: "home.cta.heading", Label: "CTA Heading", InputType: "text", Default: "Ready to Build?"},
				{Key: "home.cta.body", Label: "CTA Description", InputType: "textarea", Rows: 3, Default: "Contact us for a quote. We respond within 48 hours."},
			},
		},
		{
			Slug:        "about",
			Title:       "About",
			Description: "Company positioning, story, and the main about-page CTA copy.",
			Fields: []Field{
				{Key: "about.hero.title", Label: "Hero Title", InputType: "text", Default: "About Us"},
				{Key: "about.hero.body", Label: "Hero Description", InputType: "textarea", Rows: 3, Default: "A Wisconsin machine shop built on precision, integrity, and manufacturing excellence."},
				{Key: "about.story.eyebrow", Label: "Story Eyebrow", InputType: "text", Default: "Our Story"},
				{Key: "about.story.heading", Label: "Story Heading", InputType: "text", Default: "Built on Experience"},
				{Key: "about.story.body", Label: "Story Body", InputType: "textarea", Rows: 6, Default: "RoweTech Machine & Engineering provides precision machining and tooling solutions from Cadott, Wisconsin. We serve plastic injection molding operations throughout the Midwest -- specializing in mold repair, custom fixtures, EOAT, and CNC machining. When your production is down, every hour matters, and fast turnaround is what we do."},
				{Key: "about.values.heading", Label: "Values Heading", InputType: "text", Default: "Our Values"},
				{Key: "about.cta.heading", Label: "CTA Heading", InputType: "text", Default: "Ready to Partner With Us?"},
				{Key: "about.cta.body", Label: "CTA Description", InputType: "textarea", Rows: 3, Default: "Let's discuss how RoweTech can support your manufacturing needs."},
			},
		},
		{
			Slug:        "services",
			Title:       "Services",
			Description: "High-level service page messaging and section descriptions.",
			Fields: []Field{
				{Key: "services.hero.title", Label: "Hero Title", InputType: "text", Default: "Our Services"},
				{Key: "services.hero.body", Label: "Hero Description", InputType: "textarea", Rows: 3, Default: "Machining and tooling solutions for manufacturers."},
				{Key: "services.mold_repair.title", Label: "Mold Repair Title", InputType: "text", Default: "Plastic Injection Mold Repair"},
				{Key: "services.mold_repair.body", Label: "Mold Repair Description", InputType: "textarea", Rows: 4, Default: "Keep your production running with expert mold repair and maintenance services. We handle everything from minor repairs to major rebuilds."},
				{Key: "services.fixtures.title", Label: "Fixtures Title", InputType: "text", Default: "Custom Fixtures & Tooling"},
				{Key: "services.fixtures.body", Label: "Fixtures Description", InputType: "textarea", Rows: 4, Default: "Precision-engineered workholding and inspection fixtures designed to improve your manufacturing efficiency and quality."},
				{Key: "services.eoat.title", Label: "EOAT Title", InputType: "text", Default: "EOAT Manufacturing"},
				{Key: "services.eoat.body", Label: "EOAT Description", InputType: "textarea", Rows: 4, Default: "End-of-Arm Tooling designed and built for your specific robotic automation needs."},
				{Key: "services.cnc.title", Label: "CNC Title", InputType: "text", Default: "CNC Machining Services"},
				{Key: "services.cnc.body", Label: "CNC Description", InputType: "textarea", Rows: 4, Default: "High-precision CNC milling and turning services for prototypes, short runs, and production quantities."},
				{Key: "services.cta.heading", Label: "CTA Heading", InputType: "text", Default: "Need a Custom Solution?"},
				{Key: "services.cta.body", Label: "CTA Description", InputType: "textarea", Rows: 3, Default: "Contact us to discuss your specific requirements."},
			},
		},
		{
			Slug:        "capabilities",
			Title:       "Capabilities",
			Description: "Editable section intros for equipment, materials, tolerances, and the closing CTA.",
			Fields: []Field{
				{Key: "capabilities.hero.badge", Label: "Hero Badge", InputType: "text", Default: "Equipment • Materials • Tolerances"},
				{Key: "capabilities.hero.title", Label: "Hero Title", InputType: "text", Default: "Capabilities"},
				{Key: "capabilities.hero.body", Label: "Hero Description", InputType: "textarea", Rows: 3, Default: "Modern CNC equipment and experienced machinists ready to tackle your most demanding projects."},
				{Key: "capabilities.equipment.eyebrow", Label: "Equipment Eyebrow", InputType: "text", Default: "Our Equipment"},
				{Key: "capabilities.equipment.heading", Label: "Equipment Heading", InputType: "text", Default: "Machine Capabilities"},
				{Key: "capabilities.equipment.body", Label: "Equipment Description", InputType: "textarea", Rows: 4, Default: "Core machining processes arranged for quick scanning, with larger type and tighter grouping so the page reads like a capabilities overview instead of a distant inventory."},
				{Key: "capabilities.materials.eyebrow", Label: "Materials Eyebrow", InputType: "text", Default: "Materials We Work With"},
				{Key: "capabilities.materials.heading", Label: "Materials Heading", InputType: "text", Default: "Material Expertise"},
				{Key: "capabilities.materials.body", Label: "Materials Description", InputType: "textarea", Rows: 4, Default: "From hardened tool steels to engineering plastics, the shop is set up for production materials that demand clean machining and dependable repeatability."},
				{Key: "capabilities.tolerances.eyebrow", Label: "Tolerances Eyebrow", InputType: "text", Default: "Precision Standards"},
				{Key: "capabilities.tolerances.heading", Label: "Tolerances Heading", InputType: "text", Default: "Tolerances"},
				{Key: "capabilities.tolerances.body", Label: "Tolerances Description", InputType: "textarea", Rows: 4, Default: "Clear manufacturing targets, presented as compact benchmark cards so the key numbers carry the section instead of getting buried in whitespace."},
				{Key: "capabilities.cta.heading", Label: "CTA Heading", InputType: "text", Default: "Have a Challenging Project?"},
				{Key: "capabilities.cta.body", Label: "CTA Description", InputType: "textarea", Rows: 3, Default: "Send us your prints and specifications. We'll provide a quote."},
			},
		},
		{
			Slug:        "contact",
			Title:       "Contact",
			Description: "Lead form prompts and response expectations shown on the contact page.",
			Fields: []Field{
				{Key: "contact.hero.title", Label: "Hero Title", InputType: "text", Default: "Contact Us"},
				{Key: "contact.hero.body", Label: "Hero Description", InputType: "textarea", Rows: 3, Default: "Get in touch for a quote or to discuss your machining and tooling needs."},
				{Key: "contact.form.heading", Label: "Form Heading", InputType: "text", Default: "Request a Quote"},
				{Key: "contact.form.body", Label: "Form Description", InputType: "textarea", Rows: 3, Default: "Fill out the form below and we'll get back to you as soon as possible."},
				{Key: "contact.response.heading", Label: "Response Heading", InputType: "text", Default: "Quick Response"},
				{Key: "contact.response.body", Label: "Response Description", InputType: "textarea", Rows: 4, Default: "We typically respond to quote requests within 1-2 business days. For urgent needs, please call us directly."},
			},
		},
	}
}

func Defaults() map[string]string {
	values := make(map[string]string)
	for _, page := range Definitions() {
		for _, field := range page.Fields {
			values[field.Key] = field.Default
		}
	}
	return values
}

func IsContentKey(key string) bool {
	_, ok := Defaults()[key]
	return ok
}

func FindField(key string) (Page, Field, bool) {
	for _, page := range Definitions() {
		for _, field := range page.Fields {
			if field.Key == key {
				return page, field, true
			}
		}
	}
	return Page{}, Field{}, false
}

func TotalFieldCount() int {
	total := 0
	for _, page := range Definitions() {
		total += len(page.Fields)
	}
	return total
}
