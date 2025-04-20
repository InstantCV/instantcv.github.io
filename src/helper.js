export const scrollToNext = (ref) => {

  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

export const handleSubmit = (e) => {
  e.preventDefault();
  const details = document.querySelectorAll("details");
  details.forEach(detail => {
    detail.open = true;
  });
  const form = document.querySelector('form');
  const formObject = Object.fromEntries(new FormData(form).entries());
  sessionStorage.setItem("resumeContent", JSON.stringify(formObject))
};


export const titleCase = (str) => {
  const firstLetter = str[0].toUpperCase()
  return str.replace(str[0], firstLetter)
}

export function convertToArrayOfObjects(obj, filStr) {

  const filObjFunc = (obj, filStr) => Object.fromEntries(
    Object.entries(obj).filter(([key]) => key.includes(filStr))
  );

  const filObj = filObjFunc(obj, filStr)

  const result = [];

  for (const key in filObj) {
    const [base, index] = key.split('-');

    if (!result[index]) {
      result[index] = {};
    }

    result[index][base] = filObj[key];
  }

  return result;
}

const filObj = (obj, filStr) => Object.fromEntries(
  Object.entries(obj).filter(([key]) => key.includes(filObj))
);

export const isNextDisabled = (inputs) => inputs.some(input =>
  Object.values(input).some(value => !value)
);