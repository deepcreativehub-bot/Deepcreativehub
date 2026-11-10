# DeepCreativeHub

A responsive React and Vite portfolio for DeepCreativeHub.

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local preview URL in the terminal. Check the production bundle with:

```sh
npm run build
npm run preview
```

## Contact form setup

Email and WhatsApp links work without a form service. The inquiry form reads `VITE_CONTACT_ENDPOINT` and sends `multipart/form-data` to that endpoint. To enable delivery, add the public endpoint URL to an ignored `.env.local` file:

```sh
VITE_CONTACT_ENDPOINT=https://your-hosted-form-endpoint.example/submit
```

Without this value, the form prepares an encoded email draft containing the visitor's project details. Visitors explicitly open the draft in their email app to review and send it; the website does not claim it was delivered. Direct email and WhatsApp links remain available. `VITE_*` values are included in the browser bundle: only put a public endpoint URL here, never a private API key or secret. Verify the chosen service accepts browser requests and the submitted fields before publishing.

## Portfolio content

Projects in the Work section are self-initiated concept demonstrations, not client engagements. Replace them with approved work and accurate case-study content when available. Contact details and service content live in `src/data/`; social links include LinkedIn, with no GitHub link configured.

The canonical URL is intentionally unset until the public domain is known.
