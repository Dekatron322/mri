import sys, re

path = 'app/(landing)/page.tsx'
with open(path, 'r') as f:
    code = f.read()

# 1. Remove OperationalBlueprintBackground
code = re.sub(
    r"const OperationalBlueprintBackground = \(\{ isDark, colors.*?(?=\n// ─── Reusable section components ─────────────────────────────────)",
    "",
    code,
    flags=re.DOTALL
)

# 2. Replace SignalFlowDiagram with InteractiveConceptDiagram
interactive_code = '''// ─── Interactive Concept Diagram ─────────────────────────────────
const InteractiveConceptDiagram = ({ isDark, colors }: { isDark: boolean; colors: any }) => {
  return (
    <div className={`relative my-16 flex w-[110%] -translate-x-[5%] flex-col overflow-hidden rounded-3xl border shadow-2xl md:w-full md:translate-x-0 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
      {/* Background glow effects inside the diagram wrapper */}
      <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-30">
         <motion.div
           className="absolute -left-20 top-10 h-96 w-96 rounded-full blur-[100px]"
           style={{ background: colors.blue }}
           animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
           transition={{ duration: 8, repeat: Infinity }}
         />
         <motion.div
           className="absolute -right-20 bottom-10 h-96 w-96 rounded-full blur-[100px]"
           style={{ background: colors.amber }}
           animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
           transition={{ duration: 10, repeat: Infinity, delay: 2 }}
         />
      </div>

      <div className="relative z-10 w-full py-16 px-4 md:py-20 md:px-12">
        <svg 
           className="h-auto w-full" 
           viewBox="-250 150 1350 700" 
           preserveAspectRatio="xMidYMid meet"
           style={{
             maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
             WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
           }}
        >
          {/* Left Side: Fragmented Signals (Inputs) */}
          {/* Email Signal */}
          <SignalPath d="M -350 250 L -150 250 C 50 250, 150 400, 350 400" color={colors.blue} delay={0} />
          <BlueprintNode cx={-150} cy={250} color={colors.blue} isDark={isDark} label="EMAIL" delay={0.2} />

          {/* Slack/Chat Signal */}
          <SignalPath d="M -350 350 L -130 350 C 50 350, 150 400, 350 400" color={colors.purple} delay={1.2} />
          <BlueprintNode cx={-130} cy={350} color={colors.purple} isDark={isDark} label="CHAT" delay={0.5} />

          {/* Meetings Signal */}
          <SignalPath d="M -350 500 L -160 500 C 50 500, 150 400, 350 400" color={colors.emerald} delay={0.8} />
          <BlueprintNode cx={-160} cy={500} color={colors.emerald} isDark={isDark} label="MEETING" delay={0.8} />

          {/* Right Side: Execution & Outcomes (Outputs) */}
          {/* Task Created */}
          <SignalPath d="M 500 400 C 700 400, 800 250, 1000 250 L 1250 250" color={colors.amber} delay={2.0} />
          <BlueprintNode cx={1000} cy={250} color={colors.amber} isDark={isDark} label="TASK SYNC" delay={1.5} />

          {/* Follow-up Scheduled */}
          <SignalPath d="M 500 400 C 700 400, 800 550, 1030 550 L 1250 550" color={colors.pink} delay={2.5} />
          <BlueprintNode cx={1030} cy={550} color={colors.pink} isDark={isDark} label="FOLLOW-UP" delay={1.8} />

          {/* Center: The Coordinated Execution Trunk */}
          <motion.path
            d="M 350 400 L 500 400"
            fill="none"
            stroke={isDark ? "#4b5563" : "#9ca3af"}
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />

          {/* Animated flow across the trunk */}
          <motion.path
            d="M 350 400 L 500 400"
            fill="none"
            stroke={colors.blue}
            strokeWidth="4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />

          {/* Core Processing Node */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1, type: "spring" }}
          >
            {/* Pulse ring */}
            <motion.circle
              cx={425}
              cy={400}
              r="38"
              fill="none"
              stroke={colors.blue}
              strokeWidth="2"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Hexagon core */}
            <polygon
              points="425,372 449,386 449,414 425,428 401,414 403,386"
              fill={isDark ? "#1f2937" : "#ffffff"}
              stroke={colors.blue}
              strokeWidth="3"
            />
            <text
              x={425}
              y={355}
              textAnchor="middle"
              className={`font-syne text-[11px] font-bold uppercase tracking-[0.25em] ${isDark ? "fill-blue-400" : "fill-blue-600"}`}
            >
              CORTIFACT
            </text>
          </motion.g>

          {/* Lower decorative horizontal lines */}
          <path d="M -250 800 L 1150 800" stroke={isDark ? "#374151" : "#e5e5e5"} strokeWidth="1" strokeDasharray="10 10" />
          <BlueprintNode cx={300} cy={800} color={colors.emerald} isDark={isDark} label="MEMORY" delay={3} />
          <SignalPath d="M 300 800 L 1150 800" color={colors.emerald} delay={3.5} />
        </svg>
      </div>
    </div>
  )
}
'''

code = re.sub(
    r"// ─── Signal flow visual ──────────────────────────────────────────.*?(?=\n// ═════════════════════════════════════════════════════════════════)",
    interactive_code,
    code,
    flags=re.DOTALL
)

# 3. Remove OperationalBlueprintBackground call
code = re.sub(
    r"{/\* Dynamic Operational Blueprint Background showing execution flow \*/}\s*<OperationalBlueprintBackground isDark=\{isDark\} colors=\{colors\} />",
    "",
    code
)

# 4. Replace SignalFlowDiagram call
code = re.sub(
    r"<SignalFlowDiagram isDark=\{isDark\} />",
    "<InteractiveConceptDiagram isDark={isDark} colors={colors} />",
    code
)


with open(path, 'w') as f:
    f.write(code)
print("Done")
