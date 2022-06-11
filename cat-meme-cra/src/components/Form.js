import React from "react";

export function CatForm({ updateMainCat }) {
	const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
	const [value, setValue] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");


	function handleInputChange(e) {
		const userValue = e.target.value;

		setErrorMessage("");
		if (includesHangul(userValue)) {
			setErrorMessage("한글은 입력할 수 없습니다.")
		}

		setValue(userValue.toUpperCase());
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		if (value === '') {
			setErrorMessage("빈 값은 입력할 수 없습니다.")
			return;
		}
		if (errorMessage !== "") return;

		updateMainCat(value);
	}

	return (
		<form onSubmit={handleFormSubmit}>
			<input
				type="text"
				name="name"
				placeholder="영어대사를 입력하세요"
				value={value}
				onChange={handleInputChange}
			/>
			<button type="submit" >생성</button>
			<p style={{ color: 'red' }}>{errorMessage}</p>
		</form>
	);
};