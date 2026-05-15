'use client';

import React from 'react';
import Link from 'next/link';
import { FaFire, FaMale, FaFemale, FaRunning, FaUndo, FaShieldAlt, FaAppleAlt, FaDumbbell, FaWater, FaMoon, FaChartBar, FaUser } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';
import useCaloriesCalculator from './useCaloriesCalculator';

const CaloriesCalculator: React.FC = () => {
    const {
        gender,
        setGender,
        age,
        setAge,
        height,
        setHeight,
        weight,
        setWeight,
        activityLevel,
        setActivityLevel,
        goal,
        setGoal,
        results,
        showResults,
        calculateCalories,
        resetCalculator,
    } = useCaloriesCalculator();

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Metabolic Throughput Engine | Ecotrustia Solutions</title>
            <meta name="description" content="Calculate high-fidelity metabolic throughput. Advanced basal metabolic rate (BMR) and daily energy expenditure (TDEE) analysis using Mifflin-St Jeor protocols." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.1),transparent_70%)] pointer-events-none"></div>

                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Metabolic <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Throughput</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Synthesize daily energy expenditure vectors based on biometric coordinates and kinetic intensity."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">

                    <div className="glass-workbench shadow-2xl border border-white/[0.08] overflow-hidden" style={{ borderRadius: '32px', marginBottom: '80px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12">

                            {/* Control Node (Left 7) */}
                            <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.06]" style={{ padding: 'clamp(28px, 5vw, 56px) clamp(28px, 4.5vw, 52px)' }}>
                                <div className="flex flex-col flex-1 justify-center gap-10">

                                    <div className="space-y-8">
                                        <label className="text-[10px] uppercase font-black tracking-[0.4em] text-purple-400/60 ml-2">Biometric Node Induction</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setGender('male')}
                                                className={`py-6 rounded-[24px] flex items-center justify-center gap-4 font-black text-[10px] uppercase tracking-widest transition-all border ${gender === 'male' ? 'bg-purple-600 border-purple-500 text-white shadow-xl shadow-purple-900/40' : 'bg-[#0a0a0a] border-white/10 text-gray-500 hover:text-white hover:border-white/20'}`}
                                            >
                                                <FaMale className="text-sm" /> Mars Node
                                            </button>
                                            <button
                                                onClick={() => setGender('female')}
                                                className={`py-6 rounded-[24px] flex items-center justify-center gap-4 font-black text-[10px] uppercase tracking-widest transition-all border ${gender === 'female' ? 'bg-purple-600 border-purple-500 text-white shadow-xl shadow-purple-900/40' : 'bg-[#0a0a0a] border-white/10 text-gray-500 hover:text-white hover:border-white/20'}`}
                                            >
                                                <FaFemale className="text-sm" /> Venus Node
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { label: 'Age (Solar)', val: age, setter: setAge, unit: 'Y' },
                                            { label: 'Height (Vector)', val: height, setter: setHeight, unit: 'CM' },
                                            { label: 'Mass (Origin)', val: weight, setter: setWeight, unit: 'KG' }
                                        ].map((field, i) => (
                                            <div key={i} className="space-y-4">
                                                <label className="text-[9px] uppercase font-black tracking-[0.3em] text-gray-600 ml-2">{field.label}</label>
                                                <div className="relative group bg-[#0a0a0a] border border-white/10 rounded-[24px] flex items-center shadow-inner transition-all focus-within:border-purple-500/50" style={{ paddingLeft: '24px', paddingRight: '12px' }}>
                                                    <input
                                                        type="number"
                                                        value={field.val}
                                                        onChange={(e) => field.setter(parseInt(e.target.value) || 0)}
                                                        className="w-full bg-transparent border-none py-5 text-xl font-black text-purple-400 outline-none"
                                                        placeholder="0"
                                                    />
                                                    <span className="text-[8px] font-black text-gray-700 ml-2">{field.unit}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-6">
                                        <label className="text-[10px] uppercase font-black tracking-[0.4em] text-purple-400/60 ml-2 block">Kinetic Intensity Index</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {[
                                                { id: 1.2, label: 'Minimal (Static)', sub: 'Zero exercise cycles' },
                                                { id: 1.375, label: 'Light (Active)', sub: '1-3x weekly cycles' },
                                                { id: 1.55, label: 'Moderate (Peak)', sub: '3-5x weekly cycles' },
                                                { id: 1.725, label: 'Hard (Alpha)', sub: 'Daily intense cycles' },
                                                { id: 1.9, label: 'Extreme (Elite)', sub: 'Professional labor + cycles' }
                                            ].map((act) => (
                                                <button
                                                    key={act.id}
                                                    onClick={() => setActivityLevel(act.id)}
                                                    className={`rounded-[24px] text-left transition-all border ${activityLevel === act.id ? 'bg-purple-600/10 border-purple-500/40 shadow-[inset_0_0_20px_rgba(168,85,247,0.05)]' : 'bg-[#0a0a0a] border-white/5 hover:border-white/10'}`}
                                                    style={{ padding: '20px 20px 18px 20px' }}
                                                >
                                                    <div className="flex items-center justify-between gap-3 mb-3">
                                                        <span className={`text-[10px] font-black uppercase tracking-widest truncate ${activityLevel === act.id ? 'text-purple-400' : 'text-gray-500'}`}>{act.label}</span>
                                                        <span className="text-[8px] font-mono font-bold text-gray-700 shrink-0">{act.id}x</span>
                                                    </div>
                                                    <p className="text-[9px] text-gray-600 italic">{act.sub}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <label className="text-[10px] uppercase font-black tracking-[0.4em] text-purple-400/60 ml-2 block">Operative Goal Vector</label>
                                        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[28px] overflow-hidden focus-within:border-purple-500/50 transition-all">
                                            <select
                                                value={goal}
                                                onChange={(e) => setGoal(e.target.value)}
                                                className="w-full bg-transparent p-6 text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 outline-none cursor-pointer pr-12"
                                            >
                                                <option value="maintain" className="bg-[#0c0c0c]">Equilibrium (Maintain)</option>
                                                <option value="lose" className="bg-[#0c0c0c]">Negative Delta (Lose)</option>
                                                <option value="gain" className="bg-[#0c0c0c]">Positive Delta (Gain)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-4">
                                        <button
                                            onClick={calculateCalories}
                                            className="py-5 rounded-[32px] bg-purple-600 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-purple-900/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group min-w-0 px-4"
                                        >
                                            <FaChartBar className="shrink-0 group-hover:rotate-12 transition-transform" />
                                            <span className="truncate">Initialize Analysis</span>
                                        </button>
                                        <button
                                            onClick={resetCalculator}
                                            className="py-5 rounded-[32px] bg-white/5 border border-white/10 text-gray-500 hover:text-white hover:bg-white/10 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 active:scale-[0.98] min-w-0 px-4"
                                        >
                                            <FaUndo className="shrink-0" />
                                            <span className="truncate">Flush Buffer</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Output Node (Right 5) */}
                            <div className="lg:col-span-5 flex flex-col bg-white/[0.01]" style={{ padding: 'clamp(24px, 4vw, 48px) clamp(24px, 3vw, 40px)' }}>
                                <div className="h-full flex flex-col justify-center">
                                    {showResults ? (
                                        <div className="space-y-12 animate-in fade-in zoom-in duration-700">
                                            <div className="flex flex-col items-center text-center gap-8">
                                                <div className="relative">
                                                    <div className="absolute -inset-16 bg-purple-600/10 blur-[100px] rounded-full animate-pulse"></div>
                                                    <div className="text-[120px] md:text-[160px] font-black tracking-tighter text-white text-glow leading-none">
                                                        {results.goalCalories}
                                                    </div>
                                                </div>
                                                <div className="px-10 py-4 rounded-full border border-purple-500/20 bg-purple-500/5 text-[9px] font-black uppercase tracking-[0.5em] text-purple-400">Target Daily Throughput (Kcal)</div>

                                                <div className="grid grid-cols-2 gap-4 w-full pt-8" style={{ marginBottom: '10px' }}>
                                                    <div className="p-8 rounded-[32px] bg-[#0c0c0c] border border-white/10 flex flex-col items-center justify-center text-center relative group overflow-hidden hover:border-purple-500/30 transition-all min-w-0">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-600 block mb-3">BMR Node</span>
                                                        <span className="text-3xl font-black text-white tracking-tight">{results.bmr}</span>
                                                    </div>
                                                    <div className="p-8 rounded-[32px] bg-[#0c0c0c] border border-white/10 flex flex-col items-center justify-center text-center relative group overflow-hidden hover:border-purple-500/30 transition-all min-w-0">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-600 block mb-3">Maintenance</span>
                                                        <span className="text-3xl font-black text-white tracking-tight">{results.maintenanceCalories}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ─── BMI Dashboard Card — Production-Grade ─── */}
                                            <div className="bmi-dashboard-card">

                                                {/* LEFT COLUMN — Avatar Section (28%) */}
                                                <div className="bmi-avatar-col">
                                                    <div className="bmi-avatar-container">
                                                        <div className="bmi-avatar-glow" />
                                                        <FaUser className="bmi-avatar-icon" />
                                                    </div>
                                                </div>

                                                {/* RIGHT COLUMN — Content */}
                                                <div className="bmi-content-col">

                                                    {/* TOP LABEL */}
                                                    <span className="bmi-protocol-label">BMI Analysis Protocol</span>

                                                    {/* BMI VALUE */}
                                                    <div className="bmi-value-row">
                                                        <span className="bmi-number">{results.bmi}</span>
                                                    </div>

                                                    {/* STATUS */}
                                                    <span className="bmi-status-label">{results.bmiCategory.toUpperCase()}</span>

                                                    {/* PROGRESS SECTION */}
                                                    <div className="bmi-progress-section">
                                                        {/* Track */}
                                                        <div className="bmi-track-wrapper">
                                                            <div className="bmi-track-bg" />
                                                            {/* Thumb */}
                                                            <div
                                                                id="bmi-marker"
                                                                className="bmi-thumb"
                                                                style={{
                                                                    left: (() => {
                                                                        const b = results.bmi;
                                                                        if (b < 18.5) return `${Math.max((b / 18.5) * 25, 2)}%`;
                                                                        if (b < 25)   return `${25 + ((b - 18.5) / 6.5) * 25}%`;
                                                                        if (b < 30)   return `${50 + ((b - 25) / 5) * 25}%`;
                                                                        return `${Math.min(75 + ((b - 30) / 10) * 25, 96)}%`;
                                                                    })()
                                                                }}
                                                            />
                                                        </div>
                                                        {/* Labels */}
                                                        <div className="bmi-labels">
                                                            <span className="bmi-label">UNDER</span>
                                                            <span className={`bmi-label ${results.bmiCategory === 'Normal weight' ? 'bmi-label--active' : ''}`}>NORMAL</span>
                                                            <span className="bmi-label">OVER</span>
                                                            <span className="bmi-label">OBESE</span>
                                                        </div>
                                                    </div>

                                                </div>{/* /bmi-content-col */}
                                            </div>{/* /bmi-dashboard-card */}
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-center opacity-20 group py-20">
                                            <div className="relative mb-12">
                                                <div className="absolute inset-0 bg-purple-600/5 blur-3xl rounded-full scale-150"></div>
                                                <FaFire className="text-9xl relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000 text-purple-500/40" />
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-600">Awaiting Metabolic Induction</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-6">
                            <FaChartBar className="block text-purple-400 text-2xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white uppercase tracking-widest">Logic Model</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Utilizes Mifflin-St Jeor operational equations for high-fidelity metabolic tracking.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6">
                            <FaDumbbell className="block text-indigo-400 text-2xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white uppercase tracking-widest">Kinetic Scaling</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Precise activity multipliers ensure energy throughput is mapped to operational intensity.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6">
                            <FaFire className="block text-purple-400 text-2xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white uppercase tracking-widest">Dynamic Goals</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Engine re-calculates caloric deltas based on Expansion, Contraction, or Equilibrium vectors.</p>
                        </div>
                    </div>

                    {/* Metabolic Intelligence */}
                    <div className="about-workbench-section w-full flex flex-col items-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-[0.4em]" style={{ marginBottom: '60px' }}>Metabolic Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full">
                            {[
                                { title: 'Fuel Mapping', icon: <FaAppleAlt />, desc: 'Map nutrient macros to target throughput for optimal biological synthesis and cellular maintenance.' },
                                { title: 'Hydration Cycle', icon: <FaWater />, desc: 'Sustain metabolic flow via high-frequency water induction. 3L/day recommended for peak logic stability.' },
                                { title: 'Recovery Node', icon: <FaMoon />, desc: 'Metabolic repair happens during deep-sleep node cycles. Target 8-hour recovery windows for total restoration.' },
                            ].map((tip, i) => (
                                <div key={i} className="flex flex-col items-start text-left border-l border-purple-500/20 pl-8 group hover:border-purple-500/50 transition-all">
                                    <div className="text-purple-400/40 text-sm mb-6 group-hover:text-purple-400 group-hover:scale-110 transition-all">{tip.icon}</div>
                                    <h4 className="text-[10px] font-black uppercase text-white tracking-[0.3em] mb-4">{tip.title}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed italic line-clamp-3">{tip.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/calories_calculator" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                /* ─── Existing styles ─── */
                .glass-workbench {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                }
                .text-glow {
                    text-shadow: 0 0 40px rgba(168, 85, 247, 0.4);
                }
                .mini-card {
                    display: flex;
                    flex-direction: column;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 64px 48px;
                    border-radius: 24px;
                    transition: all 0.3s;
                }
                .mini-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(168, 85, 247, 0.2);
                }
                input[type=number]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
                select {
                    -webkit-appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666' %3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 1.5rem center;
                    background-size: 1rem;
                }

                /* ══════════════════════════════════════════════════
                   BMI DASHBOARD CARD — Production-Grade
                   8pt grid · 16:9 canvas · strict 2-col layout
                ══════════════════════════════════════════════════ */

                /* Card shell */
                .bmi-dashboard-card {
                    /* 16:9 aspect ratio container */
                    aspect-ratio: 16 / 9;
                    width: 100%;
                    max-width: 100%;

                    /* Matte black + soft purple edge glow */
                    background: #0b0b0f;
                    border-radius: 36px;
                    border: 1px solid rgba(168, 85, 247, 0.18);
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.04) inset,
                        0 0 48px 8px rgba(139, 92, 246, 0.06);

                    /* 2-column flex */
                    display: flex;
                    flex-direction: row;
                    align-items: stretch;
                    overflow: hidden;

                    /* Safe internal padding — 8pt grid (24px = 3×8) */
                    padding: 24px;
                    gap: 24px;
                    box-sizing: border-box;
                }

                /* ─ LEFT COLUMN — Avatar ─ */
                .bmi-avatar-col {
                    /* 28% of card width, minimum so avatar stays legible */
                    flex: 0 0 28%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 0;
                }

                .bmi-avatar-container {
                    /* Square container — proportional to column */
                    position: relative;
                    width: 100%;
                    aspect-ratio: 1 / 1;
                    max-width: 120px; /* never dominates the card */
                    border-radius: 28px;
                    background: rgba(139, 92, 246, 0.08);
                    border: 1px solid rgba(139, 92, 246, 0.22);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                /* Soft internal purple glow */
                .bmi-avatar-glow {
                    position: absolute;
                    inset: -20%;
                    background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.18) 0%, transparent 70%);
                    pointer-events: none;
                    border-radius: 50%;
                }

                .bmi-avatar-icon {
                    position: relative;
                    z-index: 1;
                    /* Icon scales proportionally: ~40% of container */
                    font-size: clamp(20px, 5cqi, 44px);
                    color: rgba(196, 160, 255, 0.85);
                    filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.5));
                }

                /* ─ RIGHT COLUMN — Content ─ */
                .bmi-content-col {
                    flex: 1 1 auto;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    /* Inner padding ensures content never kisses borders */
                    padding: 4px 16px 4px 8px;
                    overflow: hidden;
                }

                /* Top protocol label */
                .bmi-protocol-label {
                    display: block;
                    font-family: inherit;
                    font-size: clamp(7px, 1.1cqi, 10px);
                    font-weight: 800;
                    letter-spacing: 0.35em;
                    text-transform: uppercase;
                    color: rgba(160, 130, 200, 0.55);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 1;
                    margin-bottom: 0;
                }

                /* BMI number value */
                .bmi-value-row {
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                    /* Constrain so it never overflows right edge */
                    min-width: 0;
                    overflow: hidden;
                    /* Top and bottom breathing room */
                    margin: 4px 0 0 0;
                }

                .bmi-number {
                    /*
                        Responsive font that NEVER overflows card.
                        Container-query approach: clamped between readable min
                        and a max that comfortably fits inside the right column.
                        Right column is ~72% of the card, so budget is generous
                        but we keep it deliberate.
                    */
                    font-size: clamp(32px, 9cqi, 72px);
                    font-weight: 900;
                    color: #ffffff;
                    letter-spacing: -0.04em;
                    line-height: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: clip;
                    /* Right guard: at least 40px away from card edge */
                    max-width: calc(100% - 40px);
                    display: block;
                    text-shadow: 0 0 32px rgba(255,255,255,0.12);
                }

                /* Status badge */
                .bmi-status-label {
                    display: block;
                    font-size: clamp(7px, 1.2cqi, 11px);
                    font-weight: 800;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: #a855f7;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 1;
                    margin-top: 4px;
                }

                /* ─ Progress section ─ */
                .bmi-progress-section {
                    /* Occupies remaining bottom space */
                    flex-shrink: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    /* Bottom safe padding so labels are never clipped */
                    padding-bottom: 2px;
                }

                /* Track outer wrapper — positions thumb relatively */
                .bmi-track-wrapper {
                    position: relative;
                    height: 10px;
                    width: 100%;
                    border-radius: 999px;
                    overflow: visible; /* let thumb bleed vertically */
                }

                /* Gradient track */
                .bmi-track-bg {
                    position: absolute;
                    inset: 0;
                    border-radius: 999px;
                    background: linear-gradient(
                        to right,
                        #6b7280 0%,          /* gray  — Underweight */
                        #6b7280 24%,
                        #d4af37 25%,         /* gold  — Normal start */
                        #f59e0b 50%,         /* amber — Normal end / Overweight start */
                        #f97316 74%,         /* orange — Overweight */
                        #ef4444 75%,         /* red   — Obese */
                        #dc2626 100%
                    );
                    opacity: 0.85;
                    box-shadow: 0 1px 8px rgba(0,0,0,0.4) inset;
                }

                /* White circular thumb */
                .bmi-thumb {
                    position: absolute;
                    /* Vertically center thumb over track height */
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #ffffff;
                    box-shadow:
                        0 0 0 2px rgba(255,255,255,0.3),
                        0 0 10px 2px rgba(255,255,255,0.35);
                    z-index: 10;
                    transition: left 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                /* Labels row */
                .bmi-labels {
                    display: flex;
                    /* 4 equal segments matching track segments */
                    justify-content: space-between;
                    width: 100%;
                    padding: 0 1px; /* optical edge guard */
                }

                .bmi-label {
                    flex: 1;
                    text-align: center;
                    font-size: clamp(6px, 0.9cqi, 9px);
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(160, 160, 180, 0.45);
                    white-space: nowrap;
                    overflow: hidden;
                    /* Prevent edge labels from spilling outside card */
                }
                .bmi-label:first-child { text-align: left; }
                .bmi-label:last-child  { text-align: right; }

                .bmi-label--active {
                    color: #f5f5f5;
                    font-weight: 800;
                }

                /* Container-query context so cqi units work */
                .bmi-dashboard-card {
                    container-type: inline-size;
                }
            `}</style>
        </div>
    );
};

export default CaloriesCalculator;