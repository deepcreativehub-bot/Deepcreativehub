export const contactDetails = Object.freeze({
  businessName: 'DeepCreativeHub',
  email: 'deepcreativehub@gmail.com',
  emailHref: 'mailto:deepcreativehub@gmail.com',
  whatsappDisplay: '09069798786',
  whatsappHref: 'https://wa.me/2349069798786',
  linkedinHref: 'https://www.linkedin.com/in/deep-creative-hub-50b504447',
})

export const whatsappHrefFor = (message) =>
  `${contactDetails.whatsappHref}?text=${encodeURIComponent(message)}`