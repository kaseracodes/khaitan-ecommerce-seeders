module.exports = [
    {
        name: "Lights",
        description: "Lighting solutions for homes and offices",
        attributes: [
            { name: "Brand", dataType: "STRING", unit: "" },
            { name: "Power", dataType: "NUMBER", unit: "Watt" },
            { name: "Luminous Flux", dataType: "NUMBER", unit: "Lumens" },
            { name: "Color Temperature", dataType: "NUMBER", unit: "Kelvin" },
            { name: "Warranty", dataType: "NUMBER", unit: "Years" }
        ]
    },
    {
        name: "Fans",
        description: "Ceiling, table, and pedestal fans",
        attributes: [
            { name: "Brand", dataType: "STRING", unit: "" },
            { name: "Blade Size", dataType: "NUMBER", unit: "Inches" },
            { name: "Speed", dataType: "NUMBER", unit: "RPM" },
            { name: "Power", dataType: "NUMBER", unit: "Watt" },
            { name: "Warranty", dataType: "NUMBER", unit: "Years" }
        ]
    },
    {
        name: "Geysers",
        description: "Water heating appliances",
        attributes: [
            { name: "Brand", dataType: "STRING", unit: "" },
            { name: "Capacity", dataType: "NUMBER", unit: "Liters" },
            { name: "Power", dataType: "NUMBER", unit: "Watt" },
            { name: "Heating Element", dataType: "STRING", unit: "" },
            { name: "Warranty", dataType: "NUMBER", unit: "Years" }
        ]
    },
    {
        name: "Pumps",
        description: "Water pumps for domestic and industrial use",
        attributes: [
            { name: "Brand", dataType: "STRING", unit: "" },
            { name: "Power", dataType: "NUMBER", unit: "Watt" },
            { name: "Flow Rate", dataType: "NUMBER", unit: "Liters per minute" },
            { name: "Head Range", dataType: "NUMBER", unit: "Meters" },
            { name: "Warranty", dataType: "NUMBER", unit: "Years" }
        ]
    }
];
