const errorTemplateELement = document.querySelector('#error').content.querySelector('.error');
const successTemplateELement = document.querySelector('#success').content.querySelector('.success');

const createErrorMessage = () => {
  const errorMessage = errorTemplateELement.cloneNode(true);
  document.body.append(errorMessage);
};
const createSuccessMessage = () => {
  const successMessage = successTemplateELement.cloneNode(true);
  document.body.append(successMessage);
};

export { createErrorMessage, createSuccessMessage };
