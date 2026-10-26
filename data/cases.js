/* EXPOSE – evasion case data
 * ---------------------------------------------------------------
 * Illustrative entries compiled from public reporting on UN Panel of
 * Experts reports. Replace / extend `cases` with the project's own coded
 * dataset: keep the same fields and the database page updates itself.
 * (Loaded as a .js file so the site also works when opened from disk.)
 */
window.EXPOSE_DATA = {
  categories: [
    { id: "maritime",    label: "Maritime deception",        color: "#1f8fd6", blurb: "Ship-to-ship transfers, AIS spoofing, identity laundering and disguised vessels." },
    { id: "cyber",       label: "Cyber theft & crypto",      color: "#8a5cf6", blurb: "Hacking of banks and crypto exchanges to raise and launder funds." },
    { id: "financial",   label: "Financial system abuse",    color: "#e0a100", blurb: "Overseas bank representatives, unwitting insurers and banks, illicit money creation." },
    { id: "front",       label: "Front companies & false documents", color: "#e4572e", blurb: "Shell firms and falsified paperwork that hide who is really shipping or paying." },
    { id: "arms",        label: "Arms smuggling & diversion", color: "#c1121f", blurb: "Weapons and components moved in breach of an arms embargo, often by dhow or overland." },
    { id: "commodity",   label: "Illicit commodity trade",   color: "#2a9d8f", blurb: "Banned exports such as petroleum, coal and charcoal that finance armed groups or regimes." },
    { id: "complicity",  label: "Complicity & weak enforcement", color: "#6c757d", blurb: "State actors or forces that look away, profit, or lack capacity to enforce." },
    { id: "procurement", label: "Procurement networks",      color: "#d35d9c", blurb: "Covert purchasing of prohibited or dual-use items." }
  ],
  regimes: [
    { id: "dprk",    label: "DPRK",                 res: "Res. 1718 (2006) and successors" },
    { id: "libya",   label: "Libya",                res: "Res. 1970 (2011) / 1973 (2011)" },
    { id: "yemen",   label: "Yemen",                res: "Res. 2140 (2014) / 2216 (2015)" },
    { id: "somalia", label: "Somalia / Al-Shabaab", res: "Res. 751 (1992) / 2713 (2023)" }
  ],
  cases: [
    {
      id: "C01", regime: "dprk", year: 2019,
      title: "Ship-to-ship transfers of petroleum and coal",
      categories: ["maritime", "commodity"],
      summary: "The Panel documented a large rise in illicit ship-to-ship transfers of refined petroleum and coal at sea. Together these deliveries undercut the annual cap on refined petroleum imports and the 2017 coal ban.",
      method: "Cargo is moved between vessels in open water, so it never passes a port where inspectors could check it.",
      redFlag: "Vessels loitering in open water; cargo volumes that do not match declared ports of call.",
      report: "S/2019/171 (March 2019)",
      sourceTitle: "MPR News / AP coverage of the Panel's report",
      sourceUrl: "https://www.mprnews.org/story/2019/02/05/un-saying-nk-nukes-intact"
    },
    {
      id: "C02", regime: "dprk", year: 2019,
      title: "Ship identity theft and 'identity laundering'",
      categories: ["maritime", "front"],
      summary: "The Panel described ship identity theft, false Automatic Identification System (AIS) signals, physically disguised tankers, illegally changed vessel names and night-time transfers. It also inspected seized vessels in the coal trade and documented ship identity laundering.",
      method: "A vessel takes on the identity of another ship, or is repeatedly renamed and re-registered, so that trace-back to the real owner and history is lost.",
      redFlag: "Mismatch between a vessel's IMO number, flag and physical appearance; frequent name or flag changes.",
      report: "S/2019/171 (March 2019)",
      sourceTitle: "MPR News / AP coverage of the Panel's report",
      sourceUrl: "https://www.mprnews.org/story/2019/02/05/un-saying-nk-nukes-intact"
    },
    {
      id: "C03", regime: "dprk", year: 2019,
      title: "Class B AIS and small feeder vessels",
      categories: ["maritime"],
      summary: "The Panel identified new evasion techniques in ship-to-ship transfers: feeder vessels using Class B AIS transponders and multiple transfers carried out with smaller vessels.",
      method: "Splitting a delivery across many small vessels, with low-power transponders, makes tracking and attributing each transfer harder.",
      redFlag: "Clusters of small vessels meeting a larger tanker; Class B AIS on vessels that would normally carry Class A.",
      report: "S/2019/691 (August 2019)",
      sourceTitle: "SecurityWeek, 'UN Report: North Korea Cyber Experts Raised Up to $2 Billion'",
      sourceUrl: "https://www.securityweek.com/un-report-north-korea-cyber-experts-raised-2-billion/"
    },
    {
      id: "C04", regime: "dprk", year: 2019,
      title: "Cyberattacks on banks and crypto exchanges",
      categories: ["cyber", "financial"],
      summary: "The Panel investigated dozens of cyber operations against financial institutions and cryptocurrency exchanges and estimated total proceeds at up to US$2 billion, which it linked to weapons programmes. It reported 35 cases still under investigation.",
      method: "Stolen funds are laundered through chains of transactions. Because theft sidesteps trade, Member States cannot freeze assets in advance.",
      redFlag: "Sudden large outflows from exchanges; rapid layering of funds across many wallets and jurisdictions.",
      report: "S/2019/691 (August 2019)",
      sourceTitle: "CBS News, 'North Korea skirted U.N. sanctions and earned $2 billion using cyber attacks'",
      sourceUrl: "https://www.cbsnews.com/amp/news/north-korea-skirted-un-sanctions-and-earned-2-billion-using-cyber-attacks-new-u-n-report-says"
    },
    {
      id: "C05", regime: "dprk", year: 2019,
      title: "Overseas bank representatives for designated banks",
      categories: ["financial", "front"],
      summary: "The Panel found that designated North Korean banks kept more than 30 overseas representatives who controlled accounts and facilitated transactions, including payments tied to coal and petroleum transfers.",
      method: "Individuals abroad operate accounts on behalf of sanctioned banks, giving the banks continued access to the international system.",
      redFlag: "Individuals with links to designated banks opening accounts or acting as signatories abroad.",
      report: "S/2019/691 (August 2019)",
      sourceTitle: "CBS News coverage of the Panel's mid-term report",
      sourceUrl: "https://www.cbsnews.com/amp/news/north-korea-skirted-un-sanctions-and-earned-2-billion-using-cyber-attacks-new-u-n-report-says"
    },
    {
      id: "C06", regime: "dprk", year: 2019,
      title: "Banks and insurers unwittingly enabling transfers",
      categories: ["financial", "complicity"],
      summary: "The Panel warned that global banks and insurance companies were unknowingly handling payments and providing cover for vessels involved in ever-larger illegal transfers of petroleum products and coal.",
      method: "Routine commercial services (payments, insurance) are bought through intermediaries that hide the sanctioned end use.",
      redFlag: "Vessels with opaque ownership chains seeking insurance; payments routed through third countries.",
      report: "S/2019/171 (March 2019)",
      sourceTitle: "MPR News / AP coverage of the Panel's report",
      sourceUrl: "https://www.mprnews.org/story/2019/02/05/un-saying-nk-nukes-intact"
    },
    {
      id: "C07", regime: "dprk", year: 2019,
      title: "Procurement for weapons of mass destruction",
      categories: ["procurement"],
      summary: "The Panel reported continued procurement of items for the production of nuclear and other weapons of mass destruction, including through entities already under UN sanctions.",
      method: "Prohibited items are bought through intermediaries and third countries to hide the end user.",
      redFlag: "End-user certificates that cannot be verified; orders routed through unrelated trading firms.",
      report: "S/2019/691 (August 2019)",
      sourceTitle: "HeraldNet / AP, 'UN report: North Korea cyber experts raised up to $2 billion'",
      sourceUrl: "https://www.heraldnet.com/?p=671549"
    },
    {
      id: "C08", regime: "dprk", year: 2020,
      title: "IT-service front entities and expanding cyber activity",
      categories: ["cyber", "front"],
      summary: "The 2020 final report found that as sanctions squeezed other revenue, cyber operations expanded. This included offensive operations against financial targets and front entities selling information-technology services for hire to firms and individuals worldwide.",
      method: "Revenue-generating work is performed under the cover of ordinary freelance or outsourcing arrangements.",
      redFlag: "Freelance profiles with shared payment accounts; clients unaware of the worker's true location.",
      report: "S/2020/151 (April 2020)",
      sourceTitle: "K2 Integrity summary of the Panel's 2020 report",
      sourceUrl: "https://www.k2integrity.com/?p=3833"
    },
    {
      id: "C09", regime: "libya", year: 2021,
      title: "Arms embargo breached by foreign backers",
      categories: ["arms", "complicity"],
      summary: "The Panel called the 2011 arms embargo 'totally ineffective'. It described violations by the foreign backers of the parties to the conflict as extensive and blatant, with complete disregard for the sanctions measures.",
      method: "Weapons, equipment and support are supplied directly or indirectly by states to armed groups they back, including by air and sea.",
      redFlag: "Unusual cargo flights and maritime deliveries into Libyan ports and airfields.",
      report: "S/2021/229 (March 2021)",
      sourceTitle: "UN News, 'Libya arms embargo \u2018totally ineffective\u2019'",
      sourceUrl: "https://news.un.org/en/story/2021/03/1087562"
    },
    {
      id: "C10", regime: "libya", year: 2021,
      title: "Overland fuel smuggling and crude export attempts",
      categories: ["commodity"],
      summary: "The Panel reported that authorities in eastern Libya kept smuggling fuel overland on a small scale and continued to try to export crude oil illegally and import aviation fuel. Falling global demand during COVID-19 temporarily halted illicit refined-product exports by sea.",
      method: "Parallel institutions sell petroleum outside the control of the internationally recognised National Oil Corporation.",
      redFlag: "Fuel cargoes not sold through the official state oil company.",
      report: "S/2021/229 (March 2021)",
      sourceTitle: "Security Council Report, April 2021 Monthly Forecast: Libya",
      sourceUrl: "https://securitycouncilreport.org/monthly-forecast/2021-04/libya-21.php"
    },
    {
      id: "C11", regime: "libya", year: 2023,
      title: "Illicit refined-petroleum exports by sea",
      categories: ["commodity", "maritime"],
      summary: "The 2023 final report covered illicit exports of refined petroleum products, including activity involving Benghazi and the Brega Petroleum Marketing Company, and noted that no focal point had been in place to identify such exports when they were rampant.",
      method: "Subsidised domestic fuel is diverted onto tankers and sold abroad outside the legal export channels.",
      redFlag: "Tankers loading refined products at ports not approved for export.",
      report: "S/2023/673 (September 2023)",
      sourceTitle: "UN Digital Library, S/2023/673",
      sourceUrl: "https://digitallibrary.un.org/record/4022306/files/S_2023_673-EN.pdf"
    },
    {
      id: "C12", regime: "libya", year: 2023,
      title: "Illicit banknote printing by a parallel central bank branch",
      categories: ["financial"],
      summary: "The same report flagged a resurgence of illicit banknote printing by the eastern branch of Libya's Central Bank, which fed the parallel institutions' ability to finance themselves.",
      method: "A parallel authority creates money outside the control of the recognised central bank.",
      redFlag: "Cash shipments and printing contracts not authorised by the recognised central bank.",
      report: "S/2023/673 (September 2023)",
      sourceTitle: "UN Digital Library, S/2023/673",
      sourceUrl: "https://digitallibrary.un.org/record/4022306/files/S_2023_673-EN.pdf"
    },
    {
      id: "C13", regime: "libya", year: 2024,
      title: "Surplus diesel in illicit exports",
      categories: ["commodity", "complicity"],
      summary: "The Panel identified 185 illicit diesel exports and named the General Electric Company of Libya as the main source of the surplus diesel used. It also reported that armed groups continued to obtain military and dual-use equipment despite the embargo.",
      method: "Fuel allocated for domestic use (for example power generation) is siphoned off and exported.",
      redFlag: "Diesel leaving ports in volumes that exceed official export records.",
      report: "Final report, December 2024",
      sourceTitle: "UN document, Panel of Experts on Libya final report (Dec 2024)",
      sourceUrl: "https://documents.un.org/doc/undoc/gen/n24/384/89/pdf/n2438489.pdf"
    },
    {
      id: "C14", regime: "libya", year: 2026,
      title: "Control of the national oil company to enable oil exports",
      categories: ["commodity", "complicity", "arms"],
      summary: "The Panel's 2026 annual report found continuing arms embargo breaches, including by several Member States, and concluded that senior officials and armed-group-linked figures had exerted control over the National Oil Corporation to enable large-scale illicit oil exports. It recommended designating vessels that exported refined petroleum illicitly.",
      method: "Control of a state institution gives a veneer of legitimacy to exports that benefit sanctioned or armed-group-linked figures.",
      redFlag: "Contract awards and export approvals favouring politically connected intermediaries.",
      report: "Annual report, May 2026",
      sourceTitle: "Global Sanctions, 'UN Panel of Experts presents annual Libya sanctions report'",
      sourceUrl: "https://globalsanctions.com/2026/05/un-panel-of-experts-presents-annual-libya-sanctions-report/"
    },
    {
      id: "C15", regime: "yemen", year: 2016,
      title: "Diversion of weapons to Houthi-Saleh forces",
      categories: ["arms", "complicity"],
      summary: "The Panel noted a pattern of weapons and military support being diverted by regular army units to Houthi-Saleh forces acting under designated individuals. It also warned that coalition arms supplied without accountability measures add to destabilising accumulation.",
      method: "Legitimate stocks are handed over or sold on to groups subject to the targeted arms embargo.",
      redFlag: "Stockpile inventories that do not reconcile; units changing allegiance with their equipment.",
      report: "Final report, January 2016",
      sourceTitle: "Iran Watch summary of the 2016 Yemen Panel report",
      sourceUrl: "https://www.iranwatch.org/library/multilateral-organizations/united-nations/un-panel-experts/final-report-panel-experts-yemen-accordance-resolution-2204-2015"
    },
    {
      id: "C16", regime: "yemen", year: 2016,
      title: "Anti-tank missiles seized on a dhow off Oman",
      categories: ["arms", "maritime"],
      summary: "The Panel investigated a possible transfer of anti-tank guided missiles to Houthi-Saleh forces after an arms shipment was seized on a dhow off the coast of Oman on 25 September 2015.",
      method: "Small traditional vessels carry weapons across the Arabian Sea, hidden among ordinary cargo.",
      redFlag: "Dhows without a plausible commercial trade pattern; cargo that does not match what the crew can explain.",
      report: "Final report, January 2016",
      sourceTitle: "Iran Watch summary of the 2016 Yemen Panel report",
      sourceUrl: "https://www.iranwatch.org/library/multilateral-organizations/united-nations/un-panel-experts/final-report-panel-experts-yemen-accordance-resolution-2204-2015"
    },
    {
      id: "C17", regime: "yemen", year: 2019,
      title: "Fuel loaded in Iran under false documents to fund the war effort",
      categories: ["commodity", "front", "financial"],
      summary: "The Panel found a small number of companies inside and outside Yemen acting as fronts, using false documentation to hide a donation of fuel to a designated individual. The fuel was loaded in Iranian ports under false paperwork to avoid required UN inspections, and sale revenue financed the war effort.",
      method: "False cargo documents let fuel bypass inspection; sale proceeds then flow to a sanctioned party.",
      redFlag: "Fuel cargoes whose declared origin does not match loading records; newly formed trading firms.",
      report: "Final report (as covered by Gulf News)",
      sourceTitle: "Gulf News, 'UN: Fuel from Iran is financing Al Houthis\u2019 war'",
      sourceUrl: "https://gulfnews.com/world/gulf/yemen/un-fuel-from-iran-is-financing-al-houthis-war-1.61538394"
    },
    {
      id: "C18", regime: "yemen", year: 2020,
      title: "Overland route for drone parts and weapons",
      categories: ["arms", "procurement"],
      summary: "The Panel reported that commercially available drone parts and weapons seemed to travel overland from Oman and the southern coast of Yemen, through government-held territory, towards Sana'a. It also noted a dhow seizure of anti-tank missiles in the Arabian Sea, and doubted that the more sophisticated weapons used in attacks were made in Yemen.",
      method: "Dual-use commercial components are bought openly, then assembled, while larger items use sea routes.",
      redFlag: "Bulk purchases of off-the-shelf drone parts; smuggling corridors crossing multiple territorial controls.",
      report: "Final report, early 2020",
      sourceTitle: "The National, 'UN experts: weapons reaching Yemen's Houthi rebels resemble Iran's'",
      sourceUrl: "https://thenational-the-national-prod.cdn.arcpublishing.com/world/mena/un-experts-weapons-reaching-yemen-s-houthi-rebels-resemble-iran-s-1.972603"
    },
    {
      id: "C19", regime: "yemen", year: 2023,
      title: "Dhows and small boats dominate weapons smuggling",
      categories: ["arms", "maritime"],
      summary: "The Panel reported that most weapons, ammunition and related items intercepted during the period were smuggled on traditional sailing vessels (dhows) and smaller boats in the Arabian Sea. Several Member States alleged that the dhows had loaded in Iranian ports, which crew statements appeared to support, although the Panel could not independently confirm it.",
      method: "Many small, low-profile vessels reduce the value of any single interdiction.",
      redFlag: "Small vessels on long open-water crossings; crews unable to explain their cargo.",
      report: "Final report, February 2023",
      sourceTitle: "UN document, Panel of Experts on Yemen final report (Feb 2023)",
      sourceUrl: "https://documents.un.org/doc/undoc/gen/n22/770/93/pdf/n2277093.pdf"
    },
    {
      id: "C20", regime: "yemen", year: 2024,
      title: "Cross-regional weapons and technology networks",
      categories: ["arms", "procurement", "financial"],
      summary: "The Panel reported that the Houthis were receiving technical assistance, training, weapons and financial support within a wider regional network, and observed arms flows between the Houthis and Al-Shabaab. It also found financial sanctions only partly effective.",
      method: "Armed groups trade technology and weapons with one another, creating supply chains that cross sanctions regimes.",
      redFlag: "Shipments linking the Gulf of Aden and the Horn of Africa; dual-use telecommunications goods and pesticides in smuggling cargo.",
      report: "Final report, October 2024",
      sourceTitle: "UN document, Panel of Experts on Yemen final report (Oct 2024)",
      sourceUrl: "https://documents.un.org/doc/undoc/gen/n24/259/53/pdf/n2425953.pdf"
    },
    {
      id: "C21", regime: "yemen", year: 2025,
      title: "Concealment and misdeclaration of smuggled weapons",
      categories: ["arms", "front"],
      summary: "The 2025 final report described continued violation of the arms embargo, including through concealment and misdeclaration of cargo. Authorities intercepted more than 750 tons of ammunition and equipment in June 2025 alone, and the Panel called for strengthening the UN Verification and Inspection Mechanism (UNVIM).",
      method: "Military goods are declared as something else in shipping paperwork.",
      redFlag: "Cargo descriptions that do not match weights or container details.",
      report: "Final report, 2025",
      sourceTitle: "Asharq Al-Awsat on the Yemen Panel's report",
      sourceUrl: "https://english.aawsat.com/arab-world/5204814-panel-experts-confirm-growing-houthi-threats-yemen-and-across-region"
    },
    {
      id: "C22", regime: "somalia", year: 2016,
      title: "Charcoal ban: peacekeepers paid per bag",
      categories: ["commodity", "complicity"],
      summary: "The then Monitoring Group reported that Kenyan troops serving with the African Union mission were receiving about US$2 per bag of charcoal shipped illegally from Kismayo, with potential proceeds of around US$12 million.",
      method: "Those meant to secure ports are paid to allow banned exports to pass.",
      redFlag: "Charcoal loading at ports under foreign troop control; cash payments linked to bag counts.",
      report: "Monitoring Group report, 2016",
      sourceTitle: "Business Daily Africa, 'KDF fails to enforce ban on Shabaab charcoal sale'",
      sourceUrl: "https://www.businessdailyafrica.com/bd/news/kdf-fails-to-enforce-ban-on-shabaab-charcoal-sale-un-says-2177172"
    },
    {
      id: "C23", regime: "somalia", year: 2017,
      title: "Charcoal exports fund Al-Shabaab",
      categories: ["commodity", "financial", "complicity"],
      summary: "UN monitors said Al-Shabaab earned at least US$10 million a year shipping charcoal from southern ports where African Union troops were stationed, and that poor implementation of the five-year-old ban enabled the group's financing. Roadblock taxes were a further revenue stream.",
      method: "A banned commodity is exported openly through ports where enforcement is weak, with taxes collected along the route.",
      redFlag: "Large charcoal stockpiles at ports; roadside 'taxation' on transport corridors.",
      report: "Monitoring Group report, 2017",
      sourceTitle: "The EastAfrican, 'KDF on the spot over Shabaab charcoal exports in Somalia'",
      sourceUrl: "https://www.theeastafrican.co.ke/tea/news/east-africa/kdf-on-the-spot-over-shabaab-charcoal-exports-in-somalia-1377456"
    },
    {
      id: "C24", regime: "somalia", year: 2020,
      title: "Taxation model and dormant charcoal networks",
      categories: ["financial", "commodity"],
      summary: "The September 2020 final report examined Al-Shabaab's taxation models and revenue sources and attested to its strong financial position. It found that although charcoal exports had stopped, the networks behind the trade remained intact.",
      method: "The ban pauses exports but trading networks stay in place, ready to restart.",
      redFlag: "Dormant trading networks and stockpiles; continued extortion of businesses.",
      report: "S/2020/949 (September 2020)",
      sourceTitle: "Security Council Report, June 2021 Monthly Forecast: Somalia",
      sourceUrl: "https://www.securitycouncilreport.org/monthly-forecast/2021-06/somalia-18.php"
    },
    {
      id: "C25", regime: "somalia", year: 2022,
      title: "MV Fox: first major charcoal export since 2018",
      categories: ["commodity", "maritime"],
      summary: "The Panel recorded the first major export of charcoal from Somalia since 2018, carried by the vessel MV Fox, which Omani authorities later seized and offloaded. It prepared a dedicated thematic report on the violation.",
      method: "A single vessel moves a large banned shipment out of Somalia to an overseas destination market.",
      redFlag: "Vessels loading at Somali ports for destination markets that buy charcoal.",
      report: "Final report, September 2022 and thematic report on MV Fox",
      sourceTitle: "UN Meetings Coverage, Somalia Sanctions Committee briefing",
      sourceUrl: "https://press.un.org/en/2022/sc15070.doc.htm"
    },
    {
      id: "C26", regime: "somalia", year: 2025,
      title: "Revenue sufficient to fund Al-Shabaab operations",
      categories: ["financial", "arms"],
      summary: "The Panel's November 2025 final report concluded that Al-Shabaab continues to generate more than enough revenue to fund its activity, and mapped relationships between the group and the ISIL faction in Somalia. It also addressed implementation of the charcoal ban and disposal of charcoal stockpiles.",
      method: "Diversified income streams (taxation, extortion and trade) outpace efforts to cut financing.",
      redFlag: "Revenue that keeps growing despite targeted enforcement; taxation of businesses and transport routes.",
      report: "Final report, November 2025",
      sourceTitle: "UN document, Panel of Experts concerning Al-Shabaab (Nov 2025)",
      sourceUrl: "https://www.ecoi.net/en/file/local/2135577/n2532200.pdf"
    }
  ]
};
