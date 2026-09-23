---
title: "Why Authority Systems Need Governance Performance Tolerance Thresholds, Not Just Governance Performance Baselines"
description: "Governance performance baselines describe how the Authority System normally operates. Governance performance tolerance thresholds define how much deviation remains acceptable before investigation, escalation or corrective action is required."
pubDate: 2026-09-23
draft: false
tags:
  - AI Search
  - AI Visibility
  - Authority Systems
  - Governance
  - Performance Measurement
  - Tolerance Thresholds
canonicalSlug: "why-authority-systems-need-governance-performance-tolerance-thresholds-not-just-governance-performance-baselines"

labNumber: "056"
researchStatus: "Published"
releaseType: "Lab Note"
supports:
  - "AI Buyer Discovery Framework v1.1"
frameworkStages:
  - "AI Response Pattern Interpretation"
  - "Visibility Gap"
  - "Priority Actions"
---

Governance performance baselines help us understand how the Authority System normally behaves.

For example:

```text
P1 Decision Latency

Baseline:
1.5–3 hours
```

That is useful.

But the baseline still does not answer another important question:

> At what point does performance become unacceptable?

Suppose current latency becomes:

```text
3.5 hours
```

It is outside the usual baseline.

But does it require intervention?

What about:

```text
5 hours
```

Or:

```text
12 hours
```

A baseline tells us what is normal.

It does not define what the organisation is willing to tolerate.

That is why I think authority systems need governance performance tolerance thresholds, not just governance performance baselines.

## Normal and acceptable are different ideas

In the previous Lab Note, I explored governance performance baselines.

The working principle was:

> Governance performance indicators make the Authority System observable. Governance performance baselines establish the reference state required to determine whether that performance is stable, improving or deteriorating without confusing historical normality with acceptable performance.

That distinction matters.

An organisation can have:

```text
historically normal
```

performance that is still:

```text
operationally unacceptable
```

For example:

```text
Verification Completion

Historical baseline:
62–70%
```

The system may consistently operate in that range.

But if material remediation requires verification, the acceptable minimum might be:

```text
90%
```

So:

```text
Normal
≠
Acceptable
```

## The opposite can happen too

Performance may move outside its normal baseline without becoming unacceptable.

For example:

```text
Decision Latency

Baseline:
3–5h

Current:
5.5h

Tolerance:
≤ 8h
```

The deviation may deserve observation.

But it does not automatically require escalation.

That gives us another distinction:

```text
Baseline Deviation
≠
Tolerance Breach
```

These should not be treated as the same event.

## Baseline asks what normally happens

Tolerance asks:

> How far can performance move before the governance system requires a different response?

This may apply to indicators such as:

```text
Detection Latency
Escalation Rework
Decision Latency
Decision Reversal
Remediation Recurrence
Verification Completion
Governance Friction
```

The baseline gives context.

The tolerance gives a boundary.

## A useful measurement chain

Something like:

```text
Indicator
↓
Current State
↓
Baseline
↓
Tolerance
↓
Trigger
↓
Response
```

Each component answers a different question.

### Indicator

What are we observing?

### Current State

What is happening now?

### Baseline

What normally happens?

### Tolerance

What remains acceptable?

### Trigger

What condition requires attention?

### Response

What happens next?

This keeps measurement separate from decision.

## Governance tolerance should connect to consequence

Not every governance indicator needs the same sensitivity.

For example:

```text
P1 Decision Latency
```

may require a narrow tolerance because delayed decisions can allow material risk to persist.

But:

```text
P4 Informational Review Latency
```

may tolerate much wider variation.

So tolerance should reflect:

```text
Consequence
Urgency
Risk Class
Priority
Reversibility
Propagation Potential
```

not convenience alone.

## High-consequence governance functions should usually have tighter tolerance

Suppose a critical false-information issue requires senior approval.

A delay of:

```text
30 minutes
```

may be acceptable.

A delay of:

```text
2 hours
```

may require attention.

A delay of:

```text
12 hours
```

may represent governance failure.

But for a low-priority documentation issue, the same times may mean nothing.

Context defines the boundary.

## Tolerance should not be copied blindly from the baseline

This feels important.

Suppose the historical baseline is:

```text
P1 Decision Latency:
6–10 hours
```

If the system simply defines:

```text
Tolerance:
10 hours
```

because that is historically normal, it may institutionalise poor performance.

Tolerance should be based on:

```text
business consequence
risk appetite
operational requirement
decision dependency
```

not merely historical behaviour.

## Risk appetite should influence governance-performance tolerance

Earlier Authority System Labs established:

```text
Risk Appetite
↓
Risk Tolerance
```

A similar relationship appears here.

For example, an organisation with very low appetite for:

```text
materially false regulated information
```

may tolerate almost no delay in escalation or correction.

Another governance function may permit more variation.

So governance-performance tolerance should ultimately support the organisation's broader risk posture.

## Tolerance can differ by stage

Consider the governance chain:

```text
Detect
↓
Prioritise
↓
Escalate
↓
Evidence
↓
Decide
↓
Remediate
↓
Verify
```

Each stage can have its own acceptable operating boundary.

For example:

```text
Detection:
≤ 2h

Escalation:
≤ 30m after P1 classification

Decision:
≤ 4h

Remediation Start:
≤ 2h after decision

Verification:
≤ 24h after completion
```

The numbers here would be context-specific.

The important point is that tolerance can exist across the chain.

## Tolerance should not automatically mean one hard number

Some governance behaviour may need a range.

For example:

```text
Evidence Rework Rate

Expected:
5–10%

Tolerance:
≤ 15%
```

Other indicators may need directional rules:

```text
Decision Reversal Rate

Tolerance:
No persistent upward trend
across 3 review periods
```

Others may need categorical boundaries:

```text
Verification Failure

Tolerance:
Zero unresolved P1 verification failures
```

So tolerance design should fit the failure mode.

## Some tolerances are absolute

For example:

```text
Unauthorised material decision:
Tolerance = 0
```

or:

```text
P1 case closed without verification:
Tolerance = 0
```

If the governance principle requires zero tolerance, a single case can be material.

## Other tolerances are statistical

For example:

```text
Evidence Rework Rate
```

may fluctuate.

A rule could be:

```text
Normal:
8–12%

Watch:
13–17%

Breach:
>17% for 2 consecutive review periods
```

Now one unusual week does not automatically trigger major intervention.

## Tolerance should often include persistence

This helps avoid overreaction.

For example:

```text
Decision Latency
outside tolerance
for one isolated case
```

may require review of that case.

But:

```text
Decision Latency
outside tolerance
for 4 consecutive weeks
```

may indicate a systemic governance problem.

So tolerance logic may need:

```text
Magnitude
+
Persistence
```

not magnitude alone.

## Rate of change can matter too

Suppose:

```text
Evidence Rework

Week 1:
8%

Week 2:
11%

Week 3:
15%

Week 4:
19%
```

The final value may just cross tolerance.

But the accelerating trend may itself deserve attention.

A useful tolerance framework may consider:

```text
Current Value
Distance from Tolerance
Trend
Persistence
```

This mirrors earlier risk-indicator logic.

## A tolerance breach should be a signal, not a conclusion

Suppose:

```text
Decision Reversal Rate
> tolerance
```

That tells us:

```text
Investigate
```

It does not automatically prove:

```text
decision-makers are poor
```

Potential causes could include:

```text
weak evidence
unclear authority
new risk class
bad prioritisation
rapid environmental change
incomplete remediation
```

The breach narrows attention.

It does not replace diagnosis.

## Governance tolerance needs explicit response rules

A boundary with no response is just documentation.

For example:

```text
Decision Latency Tolerance:
8 hours
```

If current state becomes:

```text
11 hours
```

what happens?

Possible response:

```text
Review affected cases
↓
Identify bottleneck
↓
Determine whether issue is:
capacity
evidence
authority
workflow
or governance design
```

The tolerance should connect to a response path.

## A useful threshold model may have several states

For example:

```text
NORMAL
Inside baseline

WATCH
Outside baseline but inside tolerance

BREACH
Outside tolerance

CRITICAL
Material consequence or severe deviation
```

This can help distinguish ordinary variation from material failure.

## But avoid fake precision

We should not invent boundaries like:

```text
Green:
0–73

Amber:
74–81

Red:
82+
```

without evidence.

The tolerance model should be defensible.

Sometimes a qualitative boundary is more honest.

## Tolerance should reflect uncertainty

Suppose the governance baseline is provisional because:

```text
only 5 cases exist
```

Then a precise tolerance may be difficult to justify.

The system might use:

```text
Provisional Tolerance
```

and strengthen it as evidence accumulates.

This is better than pretending maturity that does not exist.

## Tolerance confidence may therefore matter

For example:

```text
Tolerance Status:
Provisional

Evidence:
Limited

Review:
After 20 relevant cases
```

Then later:

```text
Tolerance Status:
Established
```

after sufficient observation and review.

## Tolerances need ownership

Someone should be responsible for deciding:

```text
what is acceptable
why it is acceptable
when it should change
```

Otherwise tolerance boundaries may emerge accidentally from:

```text
dashboard defaults
automation code
analyst preference
```

That is risky.

## A useful tolerance record might include

```text
Tolerance ID
Indicator
Governance Function
Segment
Baseline
Target
Tolerance
Trigger Condition
Persistence Rule
Owner
Reason
Evidence
Effective Date
Review Date
Response Path
```

This turns the threshold into a governed object.

## Target and tolerance should remain separate

For example:

```text
Decision Latency

Baseline:
5h

Target:
2h

Tolerance:
≤ 6h
```

This means:

```text
2h:
desired

5h:
current normal

6h:
maximum acceptable

>6h:
requires attention
```

That is much clearer than one number labelled:

```text
KPI target
```

## Targets drive improvement

Tolerance protects the boundary.

These are different functions.

Target asks:

> Where do we want performance to move?

Tolerance asks:

> How far can performance deteriorate before response is required?

The system needs both.

## A target may be more ambitious than the baseline

For example:

```text
Baseline:
Verification Completion 74%

Target:
95%

Tolerance:
90%
```

Initially the organisation is:

```text
below tolerance
```

That means the current system is already operating outside the desired governance boundary.

That is useful information.

## Existing performance can therefore begin in breach

This may feel uncomfortable.

But it is more honest than changing tolerance to make current performance look acceptable.

For example:

```text
Historical baseline:
65%

Required minimum:
90%
```

The correct conclusion may be:

```text
Current governance performance
is structurally below tolerance.
```

That becomes an improvement priority.

## Tolerance should be proportional to reversibility

Suppose a decision can be reversed easily.

The system may tolerate more speed and uncertainty.

But for:

```text
irreversible public positioning change
```

or:

```text
material legal claim
```

the acceptable governance-performance boundary may be tighter.

Again:

```text
Consequence of Error
+
Reversibility
```

should influence tolerance.

## Tolerance should consider workload but not be defined by workload alone

Teams may be tempted to say:

```text
We cannot respond within 4 hours,
so make the tolerance 12 hours.
```

That may hide a capacity problem.

The proper question is:

> Is 12 hours acceptable for the risk?

If not, the response may need to be:

```text
increase capacity
change routing
change ownership
improve automation
```

rather than widening tolerance.

## Capacity constraints and tolerance are different concepts

A system may have:

```text
Required tolerance:
4h
```

but current capacity only supports:

```text
8h
```

That creates a governance-capability gap.

It should remain visible.

## Tolerance breaches can expose capability gaps

For example:

```text
P1 Escalation-to-Decision

Tolerance:
4h

Baseline:
7h
```

The issue may not be the tolerance.

The system may simply lack:

```text
available authority
decision coverage
sufficient evidence preparation
```

That becomes operational evidence.

## Tolerance should also consider operating hours

A four-hour requirement can mean different things depending on:

```text
24/7 operation
business hours
weekends
public holidays
```

So time-based tolerance needs clear clock definitions.

For example:

```text
4 business hours
```

is different from:

```text
4 elapsed hours
```

Without this, performance comparisons become unreliable.

## Start and stop points need definitions too

Suppose we measure:

```text
Decision Latency
```

Does the clock start at:

```text
signal detection
```

or:

```text
formal escalation
```

or:

```text
evidence package completion
```

Tolerance is meaningless without a stable measurement definition.

## Governance tolerance therefore depends on indicator quality

Weak indicator definition creates weak tolerance.

The sequence matters:

```text
Define Indicator
↓
Establish Baseline
↓
Set Tolerance
↓
Create Trigger
```

not:

```text
Choose threshold first
↓
figure out measurement later
```

## Tolerance boundaries should be tested

A proposed threshold may look reasonable on paper.

But after operation it may produce:

```text
too many alerts
too few alerts
unnecessary escalation
missed deterioration
```

So governance-performance tolerance itself should undergo:

```text
Effectiveness Review
```

This reconnects to #053.

## Tolerance is itself a governance rule

That means #052 applies too.

Changing:

```text
Decision latency tolerance:
4h → 8h
```

is not merely a dashboard edit.

It changes what the organisation defines as acceptable.

That is a governance change.

Therefore it should have:

```text
Reason
Evidence
Authority
Effective Date
Review
Version History
```

## Silent tolerance drift is dangerous

Suppose teams repeatedly ignore breaches.

Eventually:

```text
4h rule
```

behaves like:

```text
10h rule
```

even though the documented tolerance never changed.

That creates:

```text
Effective Tolerance
≠
Documented Tolerance
```

This is governance drift.

## Breach response behaviour should therefore be monitored

If the tolerance is crossed but:

```text
nothing happens
```

repeatedly, either:

```text
the tolerance is wrong
```

or:

```text
governance is not being followed
```

Both deserve investigation.

## Frequent tolerance breaches can mean several different things

For example:

```text
too strict tolerance
poor system performance
wrong baseline
weak capacity
measurement error
temporary operating stress
```

So breach frequency is evidence.

Not diagnosis.

## Zero breaches can also be suspicious

If a critical governance indicator never breaches tolerance, possible explanations include:

```text
excellent performance
very loose threshold
weak detection
missing data
```

Again, absence of alerts does not automatically prove health.

## Balance measures still matter

Suppose the organisation tightens:

```text
Decision Latency Tolerance
```

The team responds faster.

Great.

But:

```text
Decision Reversal Rate
```

also doubles.

The system may have traded:

```text
speed
```

for:

```text
decision quality
```

So governance-performance tolerances should not be optimised independently.

## Tolerance pairs may be useful

For example:

```text
Decision Speed
paired with
Decision Reversal

Evidence Completeness
paired with
Decision Latency

Escalation Volume
paired with
Missed Material Issues

Remediation Speed
paired with
Reopen Rate
```

This prevents one-dimensional improvement.

## Tolerance should sometimes apply to the relationship between indicators

For example:

```text
Faster Decision Time
```

may only be considered improvement if:

```text
Decision Reversal
does not worsen beyond tolerance
```

This is more sophisticated than looking at metrics independently.

## A governance system should avoid metric gaming

Suppose team performance is judged only on:

```text
Decision Latency
```

They may make decisions too quickly.

If judged only on:

```text
Low Reversal Rate
```

they may delay difficult decisions.

Balanced tolerances reduce incentives to optimise one measure at the expense of the system.

## Governance performance tolerance should be longitudinal

One breach can matter.

But the pattern matters too.

For example:

```text
Month 1:
within tolerance 96%

Month 2:
93%

Month 3:
87%

Month 4:
79%
```

The deterioration is more meaningful than one isolated case.

The system should observe:

```text
Breach Frequency
+
Trend
+
Severity
```

## Material exceptions should remain visible

Suppose:

```text
99% within tolerance
```

sounds excellent.

But the remaining 1% contains:

```text
the only critical reputational incident
```

Then the aggregate hides the important event.

So governance tolerance reporting should preserve material exceptions.

## Percent within tolerance can still be useful

For example:

```text
P1 decisions within tolerance:
94%
```

This is more actionable than:

```text
average decision latency:
3.2h
```

in some contexts.

But both may matter.

Again, no single metric should become the whole story.

## Tolerance can support service-level expectations

Eventually, an Authority Governance service might define:

```text
Material source conflict:
Detection-to-review ≤ X

Critical misinformation:
Escalation ≤ Y

P1 governance decision:
≤ Z
```

These are not merely operational KPIs.

They represent governance-performance commitments.

But they should only become contractual once enough evidence exists to support them.

## Do not commercialise immature thresholds too early

A tolerance that works internally may not yet be ready for:

```text
client SLA
```

because client environments differ.

Early stages should focus on:

```text
internal evidence
controlled observation
repeatability
```

before promising universal numbers.

## Tolerance thresholds can eventually support maturity tiers

For example, not as a score but as operating evidence:

```text
Early:
Tolerance not yet established

Developing:
Key tolerances defined

Operational:
Tolerance monitored consistently

Mature:
Tolerance linked to triggers,
response paths,
change control
and effectiveness review
```

This is more defensible than a generic maturity score.

## Tolerance should have review cadence

For example:

```text
Quarterly
```

or after:

```text
material governance change
new risk category
major automation change
significant workload change
```

The boundary should not remain static forever.

## But changing tolerance too often destroys its usefulness

If the threshold changes every time performance approaches it:

```text
Tolerance becomes
whatever current performance happens to be.
```

Then it stops functioning as a boundary.

So tolerance changes should require evidence.

## This creates another clean feedback loop

```text
Governance Indicator
↓
Baseline
↓
Tolerance
↓
Breach
↓
Investigation
↓
Decision
↓
Corrective Action or Governance Change
↓
Effectiveness Review
↓
Revalidate Tolerance
```

Now the self-monitoring system becomes operational rather than descriptive.

## The Authority Governance architecture now becomes

```text
POLICY
Risk Appetite

BOUNDARY
Risk Tolerance

RISK MEASUREMENT
Risk Indicators

ATTENTION
Signal Prioritisation

ESCALATION
Escalation Rules

HANDOFF
Escalation Evidence Package

EVIDENCE STANDARD
Evidence Sufficiency Criteria

DECISION
Acceptance Criteria
Acceptance Authority

OPERATIONS
Investigate
Remediate
Verify
Revalidate

LEARNING
Decision Quality Review

ADAPTATION
Governance Change Control

CHANGE EFFECTIVENESS
Governance Change Effectiveness Review

SYSTEM MEASUREMENT
Governance Performance Indicators
Governance Performance Baselines
Governance Performance Tolerance
```

This introduces a real operating boundary into the system-measurement layer.

## There is now a useful symmetry

For authority risk:

```text
Risk
↓
Indicator
↓
Current State
↓
Risk Tolerance
↓
Trigger
```

For governance performance:

```text
Governance Function
↓
Performance Indicator
↓
Baseline
↓
Performance Tolerance
↓
Trigger
```

Both systems separate:

```text
Observation
```

from:

```text
Acceptability
```

That separation feels important.

## The system can now answer four questions

```text
1. What is happening?
Indicator

2. Is it different from normal?
Baseline

3. Is it still acceptable?
Tolerance

4. Does it require intervention?
Trigger
```

That is much more useful than:

```text
Dashboard says red.
```

## The commercial implication

A basic dashboard says:

> Decision latency increased to 7 hours.

A stronger authority-governance system can say:

> Decision latency increased to 7 hours. The established baseline is 3–5 hours, the approved tolerance is 6 hours, the breach has persisted for three review periods, and the primary delay appears to be incomplete escalation evidence.

Now the system provides:

```text
measurement
+
context
+
boundary
+
persistence
+
diagnostic direction
```

That is operational intelligence.

## The working principle

My current working principle is:

> Governance performance baselines describe how the Authority System normally operates. Governance performance tolerance thresholds define how much deviation remains acceptable before a change in attention, investigation or intervention is required.

That is why authority systems need governance performance tolerance thresholds, not just governance performance baselines.
