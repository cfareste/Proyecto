const katexData = {
    gravitationLaw_Vector: "\\vec{F} = -G \\cdot \\frac{{m_1 \\cdot m_2}}{{r^2}} \\cdot \\hat{u}",
    gravitationLaw_Module: "F = - G \\cdot \\frac{{m_1 \\cdot m_2}}{{r^2}}",
    secondNewtonLaw: "F = m_1 \\cdot \\vec{a}",
    gravitationField_Vector: "\\vec{g} = -G \\cdot \\frac{{m_2}}{{r^2}} \\cdot \\hat{u}",
    gravitationField_Module: "g = G \\cdot \\frac{{m_2}}{{r^2}}"
}

export default function getKatexFormula(formula) {
    console.log(formula)
    return katexData[formula] || "F = m_1 \\cdot \\vec{g}";
}