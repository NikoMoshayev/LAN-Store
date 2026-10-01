// LAN SV Store — Catalog Data
// Based on forge-store catalog-loader pattern
// Each item has: id, title, type, description, tags, status, version, author, downloadUrl

var CATALOG = [
    // ═══════════════════════════════════════════════════════════════
    // EXTENSIONS (VSIX) — Real
    // ═══════════════════════════════════════════════════════════════
    {
        id: "gbe-nvm-builder",
        title: "GBE NVM Image Builder",
        type: "extension",
        description: "Build engineering Intel GBE NVM region images for Nahum / I219 (Jacksonville) directly from VS Code. Bundles the nvm-image-builder skill, sets up the Python env, fetches platform maps on demand, and builds .bin/.txt images.",
        tags: ["nvm", "nahum", "i219", "jacksonville", "vsix"],
        status: "ready",
        version: "0.2.0",
        author: "intel-gbe-sv",
        downloadUrl: "downloads/gbe-nvm-builder-0.2.0.vsix",
        commands: [
            "GBE NVM: Install Skill into Workspace",
            "GBE NVM: Set Up Environment (venv + openpyxl)",
            "GBE NVM: Fetch Platform Map",
            "GBE NVM: Build NVM Image"
        ]
    },
    {
        id: "hsd-toolkit",
        title: "HSD Toolkit",
        type: "extension",
        description: "Query, fetch, search, and comment on HSdes sightings directly from VS Code. Full dump: article + comments + attachments + links. Windows Kerberos/SSPI auth — no tokens needed.",
        tags: ["hsd", "hsdes", "sighting", "debug", "kerberos", "vsix"],
        status: "ready",
        version: "0.2.0",
        author: "intel-gbe-sv",
        downloadUrl: "downloads/hsd-toolkit-0.2.0.vsix",
        commands: [
            "HSD Toolkit: Set Up Environment (venv + deps)",
            "HSD Toolkit: Install Skill into Workspace",
            "HSD Toolkit: Fetch HSD (Full Dump)",
            "HSD Toolkit: Search HSdes",
            "HSD Toolkit: Query HSD"
        ]
    },
    {
        id: "swfw-tracker",
        title: "LAN SW-FW Deliveries Tracker",
        type: "extension",
        description: "Query the team's master deliverables tracker (driver versions, NVM images, FW releases, WHQL) live from SharePoint — always fresh, no download. Includes Copilot skill for version lookups during debug.",
        tags: ["driver", "firmware", "nvm", "tracker", "sharepoint", "vsix"],
        status: "ready",
        version: "0.2.0",
        author: "intel-gbe-sv",
        downloadUrl: "downloads/swfw-tracker-0.2.0.vsix",
        commands: [
            "SW-FW Tracker: Set Up Environment (venv + deps)",
            "SW-FW Tracker: Install Skill into Workspace",
            "SW-FW Tracker: Query Driver Version",
            "SW-FW Tracker: Query NVM Version",
            "SW-FW Tracker: List Available Sheets"
        ]
    },
    {
        id: "nvm-comparator-ext",
        title: "GbE NVM Comparator",
        type: "extension",
        description: "Compare a candidate GbE NVM image against the last official release \u2014 bit-exact, with every changed bit named. Splits functional config bits from bookkeeping (version / EETRACK / checksum), validates the 0xBABA checksum, matches release zips SKU-for-SKU, and flags Cons-vs-Corp asymmetry. Bundles the skill, a desktop GUI, and an HTML report. No pip install.",
        tags: ["nvm", "diff", "nahum", "i219", "checksum", "review", "vsix"],
        status: "ready",
        version: "1.0.1",
        author: "intel-gbe-sv",
        downloadUrl: "downloads/nvm-comparator-1.0.1.vsix",
        commands: [
            "NVM Comparator: Compare Two Images (HTML Report)",
            "NVM Comparator: Open Comparator (GUI)",
            "NVM Comparator: Check Image (Checksum + Version)",
            "NVM Comparator: Install Skill into Workspace",
            "NVM Comparator: Export Portable Tool (share with others)"
        ]
    },
    {
        id: "driver-log-decoder",
        title: "Driver Log Decoder (ETL / WPP)",
        type: "extension",
        description: "Right-click an .etl, enter the driver version — the extension fetches the matching PDB from \\\\ccdsrv12\\lansw\\Drivers, runs tracepdb + tracefmt (bundled), and writes a decoded .txt plus a summary with first error and top errors/warnings. E1D / E1DN / E2F / E2FN. Stdlib Python only.",
        tags: ["driver", "etl", "wpp", "pdb", "tracefmt", "netadapter", "vsix"],
        status: "ready",
        version: "0.1.0",
        author: "intel-gbe-sv",
        downloadUrl: "downloads/driver-log-decoder-0.1.0.vsix",
        commands: [
            "Driver Log: Decode ETL (fetch PDB + tracefmt)",
            "Driver Log: List Driver Versions on Share",
            "Driver Log: Install Skill into Workspace"
        ]
    },
    // ═══════════════════════════════════════════════════════════════
    // SKILLS — Placeholders
    // ═══════════════════════════════════════════════════════════════
    {
        id: "nvm-image-builder",
        title: "NVM Image Builder Skill",
        type: "skill",
        description: "Copilot skill (SKILL.md) for building Nahum GBE NVM region images. Driven by deterministic Python scripts — platform map fetch, word-level overrides, checksum computation.",
        tags: ["nvm", "nahum", "skill", "copilot"],
        status: "ready",
        version: "1.0.0",
        author: "intel-gbe-sv"
    },
    {
        id: "scandump-analyzer",
        title: "Scandump Analyzer",
        type: "skill",
        description: "Decode and analyze AXON scandump CSVs (register state captures from silicon). Diff pass vs fail captures, filter by block, identify anomalous register values.",
        tags: ["scandump", "axon", "registers", "debug"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },
    {
        id: "nvm-comparator",
        title: "NVM Comparator Skill",
        type: "skill",
        description: "Copilot skill (SKILL.md) for reviewing a GbE NVM release. Bit-exact diff vs the last official image, checksum validation, functional-vs-bookkeeping split, and the review checklist. Field names merge the NVL-S NVM map with RTL-extracted FEXTNVM definitions, so bits the workbook marks 'Reserved' still resolve.",
        tags: ["nvm", "diff", "review", "skill", "copilot", "checksum"],
        status: "ready",
        version: "1.0.0",
        author: "intel-gbe-sv"
    },
    {
        id: "fetch-platform-spec",
        title: "Fetch Platform Spec",
        type: "skill",
        description: "Retrieve and parse platform specification documents from SharePoint. Converts PDF specs to searchable Markdown for Copilot consumption.",
        tags: ["specs", "sharepoint", "platform", "docs"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },

    // ═══════════════════════════════════════════════════════════════
    // MCP SERVERS — Placeholders
    // ═══════════════════════════════════════════════════════════════
    {
        id: "headroom-mcp",
        title: "Headroom (Token Compressor)",
        type: "mcp-server",
        description: "Compresses large artifacts (logs, CSVs, dumps) before they hit the model context — 60–95% fewer tokens, same answers. Stores originals locally for on-demand retrieval.",
        tags: ["headroom", "compression", "tokens", "context"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },
    {
        id: "sharepoint-mcp",
        title: "SharePoint Documents MCP",
        type: "mcp-server",
        description: "Access Intel SharePoint documents. List, search, and read Word/PDF/PPT/Excel/text files from configurable SharePoint sites.",
        tags: ["sharepoint", "docs", "specs", "bkms"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },
    {
        id: "pythonsv-unified-mcp",
        title: "PythonSV Unified MCP",
        type: "mcp-server",
        description: "Query live PythonSV registers, Axon scandumps, HSD tickets, and Ferret data via the pysvtools.unified-mcp Copilot bridge. Requires lab SUT access.",
        tags: ["pythonsv", "registers", "axon", "lab"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },
    {
        id: "m365-graph-mcp",
        title: "M365 Graph MCP",
        type: "mcp-server",
        description: "Microsoft 365 integration — email, calendar, Teams, OneDrive, SharePoint, OneNote. Search messages, send emails, manage events.",
        tags: ["m365", "outlook", "teams", "calendar"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },

    // ═══════════════════════════════════════════════════════════════
    // AGENTS — Placeholders
    // ═══════════════════════════════════════════════════════════════
    {
        id: "gbe-debugger",
        title: "GbE Debugger Agent",
        type: "agent",
        description: "Root-cause analysis agent for post-silicon GbE failures. Parses logs, correlates driver↔RTL↔FW, searches specs, proposes root cause with evidence.",
        tags: ["debug", "rca", "post-si", "agent"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },
    {
        id: "gbe-rtl-designer",
        title: "GbE RTL Designer Agent",
        type: "agent",
        description: "RTL design assistant — SystemVerilog, CDC analysis, power management, clock domain crossings, assertions.",
        tags: ["rtl", "systemverilog", "cdc", "design"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },
    {
        id: "gbe-si-validator",
        title: "Silicon Validation Agent",
        type: "agent",
        description: "Post-Si bring-up specialist — scandumps, S0ix/Cstate, PCIe link training, register dumps, NVM validation.",
        tags: ["silicon", "validation", "bring-up", "s0ix"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },

    // ═══════════════════════════════════════════════════════════════
    // TOOLS
    // ═══════════════════════════════════════════════════════════════
    {
        id: "smbus-parser",
        title: "SMBus / MDIO Trace Parser",
        type: "tool",
        description: "Standalone GUI app — decode SMBus (I2C/MDIO) traces from Total Phase or Saleae captures. Parses MAC↔PHY transactions, tracks MDIO page state, names Jacksonville PHY registers, detects link events and anomalies. No external deps — just Python 3.8+.",
        tags: ["smbus", "mdio", "phy", "jacksonville", "saleae", "i2c", "trace"],
        status: "ready",
        version: "2.1",
        author: "intel-gbe-sv",
        downloadUrl: "downloads/smbus-parser-2.1.zip"
    },
    {
        id: "nvm-comparator-tool",
        title: "NVM Comparator (Standalone)",
        type: "tool",
        description: "Standalone GUI app \u2014 load two NVM images and get a comprehensive comparison report. Bit-exact diff with named fields, 0xBABA checksum validation, functional-vs-bookkeeping split, Cons/Corp SKU pairing, and HTML / Markdown export. Accepts release .zip, folders, .bin or .txt. Python 3.9+ only \u2014 no pip, no network, no repo.",
        tags: ["nvm", "diff", "gui", "standalone", "checksum", "review"],
        status: "ready",
        version: "1.0.1",
        author: "intel-gbe-sv",
        downloadUrl: "downloads/nvm-comparator-tool-1.0.1.zip"
    },
    {
        id: "espi-analyzer",
        title: "eSPI Transaction Analyzer",
        type: "tool",
        description: "Decode and analyze eSPI bus transactions from Acute/logic analyzer captures. Correlates NVM loads, CSME handshake, and GbE initialization sequence.",
        tags: ["espi", "acute", "nvm", "csme"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },
    {
        id: "memdump-analyzer",
        title: "Memory Dump Analyzer",
        type: "tool",
        description: "Analyze DRAM regions, TX/RX FIFOs, descriptor rings, NVM shadow — .bin/.hex/.csv. Provides stats, diff, hexdump, and ring decode.",
        tags: ["memory", "dram", "fifo", "descriptors"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },

    // ═══════════════════════════════════════════════════════════════
    // PROMPTS — Placeholders
    // ═══════════════════════════════════════════════════════════════
    {
        id: "debug-triage-prompt",
        title: "Debug Triage",
        type: "prompt",
        description: "Structured debug triage template — reproduce → capture → correlate → hypothesize → instrument → document in HSD.",
        tags: ["debug", "triage", "prompt", "hsd"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },
    {
        id: "bug-report-prompt",
        title: "Bug Report Formatter",
        type: "prompt",
        description: "Format raw notes into a clean HSdes bug report — symptom, environment, repro steps, evidence, root cause, and fix sections.",
        tags: ["bug", "report", "hsdes", "format"],
        status: "coming-soon",
        version: "—",
        author: "intel-gbe-sv"
    },

    // ═══════════════════════════════════════════════════════════════
    // REPOS — Consolidated repository hub + resources
    // ═══════════════════════════════════════════════════════════════
    {
        id: "gbe-repos",
        title: "GbE Code Repositories",
        type: "repo",
        description: "VS Code workspace file with all GbE driver, firmware, and tool repos. Download, open in VS Code → all repos in one workspace.",
        tags: ["driver", "firmware", "netadapter", "ndis", "foxville", "nahum", "csme", "workspace"],
        status: "ready",
        version: "—",
        author: "LAN SW/FW",
        downloadUrl: "downloads/gbe-repos.code-workspace"
    }
];
