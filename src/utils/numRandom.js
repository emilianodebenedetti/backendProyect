const getRandom = (quantity) => {
	let numMax = 100000000;
	const objResult = {};
	const nQuantity = quantity || numMax;
	for (let i = 0; i < nQuantity; i++) {
		const result = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
		const findKey = Object.keys(objResult).includes(`${result}`);

		if (findKey) {
			objResult[`${result}`] = objResult[`${result}`] + 1;
		} else { 
			objResult[`${result}`] = 1;
		}
	}
	return objResult;
};

process.on("message", (msg) => {
	if (msg.msg === "start") {
		process.send(getRandom(msg.cant));
		process.send({ msg: "Cálculo iniciado..."});
		process.exit();
	} else {
		process.send({ msg: "Cálculo no iniciado..." });
		process.exit();
	}
});

export default getRandom;