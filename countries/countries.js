/*
  EXPOSE – country data for the Countries map.

  HOW TO EDIT
  - Every country NOT listed here is shown as "No UN sanctions" (grey).
  - "id" is the ISO 3166-1 numeric code (as text, 3 digits). Look it up if you add a country.
  - type: "panel"     = UN sanctions + a Panel of Experts (studied by EXPOSE)
          "sanctions" = UN sanctions but NO Panel of Experts (not studied)
  - status (panel countries only): "active" | "ended" | "check"
  - match: words used to link the country to a regime in data/cases.js
           (compared with each regime's label/res). If a match is found, the
           country card shows the number of cases and a link to the database.
           Add the words your regime labels use (e.g. "DPRK", "North Korea").
  - exclude: (optional) words that must NOT appear in the regime label
           (used so "Sudan" does not pick up "South Sudan").

  IMPORTANT: Dates, resolutions and mandate status were compiled quickly and
  must be checked against https://main.un.org/securitycouncil/en/sanctions/information
  before you publish. Mandates change every year.
*/
window.EXPOSE_COUNTRIES = [

  /* ===================== SANCTIONS + PANEL OF EXPERTS ===================== */
  { id: "024", name: "Angola", type: "panel", status: "ended",
    regime: "UNITA sanctions",
    res: "Res. 864 (1993), 1127 (1997), 1173 (1998), 1295 (2000)",
    years: "1993–2002",
    measures: "Arms and oil embargo, diamond ban, travel and financial restrictions on UNITA.",
    panel: "Panel of Experts on UNITA sanctions, later a Monitoring Mechanism",
    panelYears: "1999–2002",
    summary: "One of the first regimes to be monitored by an expert panel. The reports looked at how UNITA financed its war through diamonds and obtained arms and fuel despite the embargo.",
    match: ["Angola", "UNITA"] },

  { id: "694", name: "Sierra Leone", type: "panel", status: "ended",
    regime: "Sierra Leone sanctions",
    res: "Res. 1132 (1997), 1306 (2000)",
    years: "1997–2010",
    measures: "Arms and oil embargo, travel ban and a ban on rough-diamond imports from Sierra Leone.",
    panel: "Panel of Experts on Sierra Leone",
    panelYears: "from 2000",
    summary: "The Panel investigated the link between illicit diamond sales and arms supplies to armed groups.",
    match: ["Sierra Leone"] },

  { id: "430", name: "Liberia", type: "panel", status: "ended",
    regime: "Liberia sanctions",
    res: "Res. 1343 (2001), 1521 (2003)",
    years: "2001–2016",
    measures: "Arms embargo, travel ban, and bans on diamonds and timber; later asset freezes on listed individuals.",
    panel: "Panel of Experts on Liberia",
    panelYears: "2001–2016",
    summary: "Panel reports traced how revenue from timber and diamonds and arms shipments fed regional conflicts.",
    match: ["Liberia"] },

  { id: "384", name: "Côte d'Ivoire", type: "panel", status: "ended",
    regime: "Côte d'Ivoire sanctions",
    res: "Res. 1572 (2004), 1643 (2005)",
    years: "2004–2016",
    measures: "Arms embargo, travel ban, asset freeze and a ban on rough-diamond imports.",
    panel: "Group of Experts on Côte d'Ivoire",
    panelYears: "2005–2016",
    summary: "The Group documented arms transfers and illicit trade in diamonds and cocoa financing during and after the civil conflict.",
    match: ["Côte d'Ivoire", "Cote d'Ivoire", "Ivory"] },

  { id: "180", name: "Democratic Republic of the Congo", type: "panel", status: "active",
    regime: "DRC sanctions",
    res: "Res. 1493 (2003), 1533 (2004), 1807 (2008)",
    years: "2003–present",
    measures: "Arms embargo on non-governmental armed groups, travel ban and asset freeze on listed individuals.",
    panel: "Group of Experts on the DRC",
    panelYears: "2004–present (earlier panel on resource exploitation, 2001–2003)",
    summary: "Reports describe the illicit trade in gold, tin, tantalum and tungsten, and arms flows to armed groups in the east.",
    match: ["DRC", "Congo"] },

  { id: "729", name: "Sudan", type: "panel", status: "active",
    regime: "Sudan (Darfur) sanctions",
    res: "Res. 1556 (2004), 1591 (2005)",
    years: "2004–present",
    measures: "Arms embargo for Darfur, travel ban and asset freeze on listed individuals.",
    panel: "Panel of Experts on the Sudan",
    panelYears: "2005–present",
    summary: "The Panel reports on arms transfers into Darfur, violations of the embargo and the financing of armed groups.",
    match: ["Sudan"], exclude: ["South"] },

  { id: "706", name: "Somalia", type: "panel", status: "active",
    regime: "Somalia and Al-Shabaab sanctions",
    res: "Res. 733 (1992), 751 (1992), 1844 (2008), 2036 (2012), 2713 (2023)",
    years: "1992–present",
    measures: "Arms embargo, charcoal export ban, travel ban and asset freeze on listed individuals and Al-Shabaab.",
    panel: "Panel of Experts / Monitoring Group on Somalia",
    panelYears: "2002–present",
    summary: "Panel reports cover arms smuggling by sea, the charcoal trade and the financing of Al-Shabaab.",
    match: ["Somalia", "Al-Shabaab"] },

  { id: "232", name: "Eritrea", type: "panel", status: "ended",
    regime: "Eritrea sanctions",
    res: "Res. 1907 (2009), lifted by Res. 2444 (2018)",
    years: "2009–2018",
    measures: "Arms embargo, travel ban and asset freeze on listed individuals.",
    panel: "Somalia and Eritrea Monitoring Group",
    panelYears: "2009–2018",
    summary: "Monitored jointly with Somalia. Sanctions were lifted in November 2018.",
    match: ["Eritrea"] },

  { id: "364", name: "Iran", type: "panel", status: "check",
    regime: "Iran (nuclear) sanctions",
    res: "Res. 1737 (2006), 1747 (2007), 1803 (2008), 1929 (2010)",
    years: "2006–2016; measures reimposed in 2025 (disputed)",
    measures: "Restrictions on nuclear and missile items, arms embargo, asset freezes and financial measures.",
    panel: "Panel of Experts (Res. 1929)",
    panelYears: "2010–2016",
    summary: "The Panel investigated procurement networks, front companies and shipping used to move proscribed items. UN sanctions were reimposed in September 2025 through the snapback mechanism, which Iran, Russia and China contest. Check the current status of the Panel.",
    match: ["Iran"] },

  { id: "408", name: "North Korea (DPRK)", type: "panel", status: "ended",
    regime: "DPRK sanctions",
    res: "Res. 1718 (2006), 1874 (2009), 2270 (2016), 2371, 2375 and 2397 (2017)",
    years: "2006–present",
    measures: "Arms embargo, ban on nuclear and missile items, caps on refined petroleum, bans on coal, textiles, seafood and overseas workers.",
    panel: "Panel of Experts (Res. 1874)",
    panelYears: "2009–2024",
    summary: "The best-documented regime: ship-to-ship transfers, AIS manipulation, front companies, overseas workers and cyber theft of crypto-assets. The Panel's mandate was not renewed in 2024.",
    match: ["DPRK", "North Korea", "Korea"] },

  { id: "434", name: "Libya", type: "panel", status: "active",
    regime: "Libya sanctions",
    res: "Res. 1970 (2011), 1973 (2011), 2146 (2014)",
    years: "2011–present",
    measures: "Arms embargo, travel ban, asset freeze and measures against illicit petroleum exports.",
    panel: "Panel of Experts on Libya",
    panelYears: "2011–present",
    summary: "Reports document arms deliveries to different factions and the illicit export of petroleum products by sea.",
    match: ["Libya"] },

  { id: "140", name: "Central African Republic", type: "panel", status: "active",
    regime: "CAR sanctions",
    res: "Res. 2127 (2013), 2745 (2024)",
    years: "2013–present",
    measures: "Arms embargo on armed groups, travel ban and asset freeze on listed individuals.",
    panel: "Panel of Experts on the CAR",
    panelYears: "2014–present",
    summary: "The Panel reports on arms trafficking, illicit trade in gold and diamonds, and the financing of armed groups.",
    match: ["Central African", "CAR"] },

  { id: "728", name: "South Sudan", type: "panel", status: "check",
    regime: "South Sudan sanctions",
    res: "Res. 2206 (2015), 2428 (2018)",
    years: "2015–present",
    measures: "Arms embargo, travel ban and asset freeze on listed individuals.",
    panel: "Panel of Experts on South Sudan",
    panelYears: "2015–present",
    summary: "The Panel reports on arms procurement, the oil sector and the finances of those obstructing peace. The mandate is renewed annually, so check its current status.",
    match: ["South Sudan"] },

  { id: "887", name: "Yemen", type: "panel", status: "check",
    regime: "Yemen sanctions",
    res: "Res. 2140 (2014), 2216 (2015)",
    years: "2014–present",
    measures: "Targeted arms embargo, travel ban and asset freeze on listed individuals.",
    panel: "Panel of Experts on Yemen",
    panelYears: "2014–present",
    summary: "The Panel reports on weapons smuggling by sea, including by dhow, and on illicit financing and fuel trade. The mandate is renewed annually, so check its current status.",
    match: ["Yemen"] },

  { id: "466", name: "Mali", type: "panel", status: "ended",
    regime: "Mali sanctions",
    res: "Res. 2374 (2017)",
    years: "2017–2023",
    measures: "Travel ban and asset freeze on those obstructing the peace agreement.",
    panel: "Panel of Experts on Mali",
    panelYears: "2018–2023",
    summary: "The regime ended in August 2023 when a renewal draft was vetoed in the Security Council.",
    match: ["Mali"] },

  { id: "332", name: "Haiti", type: "panel", status: "active",
    regime: "Haiti sanctions",
    res: "Res. 2653 (2022)",
    years: "2022–present",
    measures: "Travel ban, asset freeze and arms embargo targeting gang leaders and their supporters.",
    panel: "Panel of Experts on Haiti",
    panelYears: "2022–present",
    summary: "The newest regime: the Panel looks at gang financing, arms and ammunition trafficking and illicit flows.",
    match: ["Haiti"] },


  /* =========== UN SANCTIONS, BUT NO PANEL OF EXPERTS (not studied) =========== */
  { id: "004", name: "Afghanistan", type: "sanctions",
    regime: "Taliban sanctions (1988 regime)",
    res: "Res. 1267 (1999), 1988 (2011)",
    years: "1999–present",
    measures: "Asset freeze, travel ban and arms embargo on listed Taliban individuals and entities.",
    summary: "Supported by a Monitoring Team, which is a different body from a country-specific Panel of Experts." },

  { id: "368", name: "Iraq", type: "sanctions",
    regime: "Iraq sanctions",
    res: "Res. 661 (1990), 1483 (2003), 1518 (2003)",
    years: "1990–2003; residual measures today",
    measures: "Comprehensive trade embargo until 2003; since then asset freezes on former regime members.",
    summary: "The oil-for-food programme was audited by an independent inquiry, not by a Panel of Experts." },

  { id: "422", name: "Lebanon", type: "sanctions",
    regime: "Lebanon sanctions",
    res: "Res. 1636 (2005), 1701 (2006)",
    years: "2005–present",
    measures: "Travel ban and asset freeze on those suspected in the Hariri assassination; arms embargo on non-state groups.",
    summary: "Overseen by a sanctions committee without an expert panel." },

  { id: "624", name: "Guinea-Bissau", type: "sanctions",
    regime: "Guinea-Bissau sanctions",
    res: "Res. 2048 (2012)",
    years: "2012–present",
    measures: "Travel ban on those who sought to disrupt the return to constitutional order.",
    summary: "A small, targeted regime with no expert panel." },

  { id: "646", name: "Rwanda", type: "sanctions",
    regime: "Rwanda arms embargo",
    res: "Res. 918 (1994)",
    years: "1994–2008",
    measures: "Arms embargo on non-governmental forces.",
    summary: "An international commission of inquiry looked at arms flows, but no Panel of Experts was created." },

  { id: "231", name: "Ethiopia", type: "sanctions",
    regime: "Ethiopia–Eritrea arms embargo",
    res: "Res. 1298 (2000)",
    years: "2000–2001",
    measures: "Arms embargo on both Ethiopia and Eritrea during their border war.",
    summary: "Short-lived embargo with no expert panel. Eritrea was later sanctioned again (see Eritrea)." },

  { id: "688", name: "Serbia (Former Yugoslavia)", type: "sanctions",
    regime: "Yugoslavia sanctions",
    res: "Res. 713 (1991), 757 (1992), 1160 (1998)",
    years: "1991–2001",
    measures: "Trade and financial sanctions, later an arms embargo during the Kosovo crisis.",
    summary: "Monitored through a sanctions assistance mission and not by a Panel of Experts." },

  { id: "116", name: "Cambodia", type: "sanctions",
    regime: "Khmer Rouge sanctions",
    res: "Res. 792 (1992)",
    years: "1992–1993",
    measures: "Ban on petroleum supplies and on exports of logs and gems from Khmer Rouge-held areas.",
    summary: "A brief regime during the UN transition authority." },

  { id: "710", name: "South Africa", type: "sanctions",
    regime: "Apartheid arms embargo",
    res: "Res. 418 (1977)",
    years: "1977–1994",
    measures: "Mandatory arms embargo against the apartheid government.",
    summary: "Lifted in 1994. No expert panel existed." },

  { id: "716", name: "Zimbabwe (Southern Rhodesia)", type: "sanctions",
    regime: "Southern Rhodesia sanctions",
    res: "Res. 232 (1966), 253 (1968)",
    years: "1966–1979",
    measures: "Mandatory, comprehensive economic sanctions.",
    summary: "The first mandatory UN sanctions regime. A sanctions committee looked at violations but there was no Panel of Experts." }
];
