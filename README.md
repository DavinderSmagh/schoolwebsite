# Saraswati Public School website

This website is built with React and Vite. PHP is not required to run or host the
React frontend.

## Run locally

Install Node.js, then run:

```sh
npm install
npm run dev
```

## Deploy to shared hosting

Run `npm run build`, then upload the **contents** of the generated `dist`
directory to the hosting account's website document root (often `public_html`).
The app uses hash-based routes, so page navigation works on static hosting and
does not require Apache rewrite rules.

Remove the old PHP site files from the document root when replacing the site;
otherwise a hosting server may continue to serve the old `index.php`.

The inquiry forms currently provide client-side validation only. Connect a form
service or backend before expecting submissions to be delivered to the school.
