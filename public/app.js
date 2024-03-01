const inputPhone = document.querySelector("#phone");

const maskPhoneOptions = {
	mask: "+7(000)000-00-00",
};

const mask = new IMask(inputPhone, maskPhoneOptions);
