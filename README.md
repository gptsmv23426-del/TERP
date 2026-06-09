# TERP Guide: Education & Referral Site

Static single-page site that explains the Texas Emissions Reduction Plan (TERP) in plain English and routes visitors to Justin Hiller for a real conversation.

## How to edit

### Contact info and counties

Open `script.js` and edit the `CONFIG` block at the top:

```js
const CONFIG = {
  consultantName: "Justin Hiller",
  phone: "555-123-4567",        // ← your real number
  serviceArea: "San Antonio, New Braunfels & surrounding counties",
  eligibleCounties: ["Bexar", "Comal", "Guadalupe", "Wilson"],
  programStatusNote: "...",     // ← update if grant round status changes
  moneyRealityNote: "...",      // ← update if reimbursement process changes
};
```

Every phone link, name, and status note on the site pulls from this block. Change it once, it updates everywhere.

### Section text

All visible text lives in `index.html`. Open it in any text editor, find the section you want to change, and edit the text between the HTML tags. The structure is straightforward; each section is labeled with a comment like `<!-- 2. What Is TERP -->`.

### Fonts and colors

Open `styles.css` and edit the CSS variables at the top (inside `:root { ... }`). The color names match their purpose: `--green`, `--charcoal`, `--yellow`, `--off-white`.

## Prep worksheets

Two documents live in `public/docs/`, each in two forms:

- The **PDF** (`terp-prep-worksheet.pdf`, `terp-checklist.pdf`) is what visitors download and print. The site links to these so people can just press Print.
- The **HTML** (`terp-prep-worksheet.html`, `terp-checklist.html`) is the editable source.

To change a worksheet:

1. Open the `.html` version in a text editor and edit the text.
2. Re-create the PDF: open that edited `.html` file in your browser, press Ctrl+P (Cmd+P on Mac), choose "Save as PDF," and save over the matching `.pdf` file in `public/docs/`.

The site always links to the `.pdf` files, so once you save over them the site is updated. No code changes needed.

## Deploy to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com) and import the repo.
3. Settings:
   - Framework Preset: **Other**
   - Build Command: *(leave blank)*
   - Output Directory: *(leave blank / root)*
4. Deploy.

Updates: push to GitHub and Vercel auto-deploys.

### Domain

For a genuinely independent service, use a dedicated domain (not an RDO subdomain) and point it at Vercel via their Domains settings. The site is phone-only right now; if you add an email contact later, use a non-RDO address.

## What this site is NOT

- Not affiliated with TCEQ, the State of Texas, or RDO Equipment Co.
- Not a guarantee of funding or eligibility.
- Not a contact form or lead-capture funnel; it's education plus a phone number.
