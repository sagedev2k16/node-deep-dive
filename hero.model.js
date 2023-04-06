export default {
    TABLE_NAME: "heroes",
    sampleData: [
        {name: "Iron Man 1", power: "Suit of powerful weapons", team: "Avengers", full_name: "Tony Stark", weight: "191 kg"},
        {name: "Iron Man 2", power: "Suit of powerful weapons", team: "Avengers", full_name: "Tony Stark", weight: "191 kg"},
        {name: "Iron Man 3", power: "Suit of powerful weapons", team: "Avengers", full_name: "Tony Stark", weight: "191 kg"},
        {name: "Iron Man 4", power: "Suit of powerful weapons", team: "Avengers", full_name: "Tony Stark", weight: "191 kg"}
    ],
    createTable: (table) => {
        table.increments('id'); // Auto incremented by DB. Starts from 1
        table.string('name');
        table.string('power');
        table.string('team');
        table.string('full_name');
        table.string('weight');
    }
}