
const number_emoji = ['1️⃣',
                      '2️⃣',
                      '3️⃣',
                      '4️⃣',
                      '5️⃣',
];

module.exports = async function (msg) {
    number_emoji.forEach((element) => {
        msg.react(element);
    });
}
