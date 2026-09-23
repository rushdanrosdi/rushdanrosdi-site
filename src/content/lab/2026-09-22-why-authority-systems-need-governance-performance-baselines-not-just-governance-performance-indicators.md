---
title: "Why Authority Systems Need Governance Performance Baselines, Not Just Governance Performance Indicators"
description: "Governance performance indicators make the Authority System observable. Governance performance baselines establish the reference state needed to determine whether that performance is stable, improving or deteriorating."
pubDate: 2026-09-22
draft: false
tags:
  - AI Search
  - AI Visibility
  - Authority Systems
  - Governance
  - Performance Indicators
  - Baselines
canonicalSlug: "why-authority-systems-need-governance-performance-baselines-not-just-governance-performance-indicators"

labNumber: "055"
researchStatus: "Published"
releaseType: "Lab Note"
supports:
  - "AI Buyer Discovery Framework v1.1"
frameworkStages:
  - "AI Response Pattern Interpretation"
  - "Visibility Gap"
  - "Priority Actions"
---

Governance performance indicators make the Authority System observable.

They can show:

```text
Decision latency
Escalation rework
Remediation recurrence
Verification completion
Governance friction
```

But an indicator value by itself can still be difficult to interpret.

For example:

```text
Decision Latency:
8 hours
```

Is that:

```text
good
normal
slow
improving
deteriorating
```

?

Without a reference state, we do not know.

That is why I think authority systems need governance performance baselines, not just governance performance indicators.

## Measurement needs a reference point

In the previous Lab Note, I explored governance performance indicators.

The working principle was:

> Risk indicators make authority exposure visible. Governance performance indicators make the performance of the Authority System itself visible, so deterioration in detection, escalation, decision-making, remediation or assurance can be identified before it becomes a larger governance failure.

That creates observability.

But observability alone does not create interpretation.

Suppose we record:

```text
Evidence Rework Rate:
18%
```

The number exists.

But another question immediately appears:

> Compared with what?

Maybe:

```text
Previous month:
9%
```

Now 18% looks concerning.

Or perhaps:

```text
Previous month:
31%
```

Now 18% may represent improvement.

The same current value can mean very different things depending on the baseline.

## Indicator values are not self-explanatory

Consider:

```text
P1 Decision Latency:
4 hours
```

That could mean:

### Situation A

```text
Historical normal:
2 hours

Current:
4 hours
```

Performance has deteriorated.

### Situation B

```text
Historical normal:
10 hours

Current:
4 hours
```

Performance has improved substantially.

### Situation C

```text
Required response:
30 minutes
```

Both historical states may still be unacceptable.

So one number can require several reference points.

## A baseline is not necessarily a target

This distinction matters.

Suppose:

```text
Current baseline:
Average P1 decision latency = 8 hours
```

That does not mean:

```text
8 hours is acceptable.
```

It means:

```text
This is what the system currently does.
```

A baseline describes reality.

A target describes desired performance.

A tolerance defines what remains acceptable.

These should not be confused.

## A useful distinction

Perhaps:

```text
BASELINE
What normally happens?

TARGET
What performance are we trying to achieve?

TOLERANCE
How much variation remains acceptable?

TRIGGER
When does variation require investigation?
```

These four concepts have different purposes.

## Baselines prevent aspiration from being mistaken for reality

An organisation may say:

```text
P1 decisions should happen within 2 hours.
```

Good.

But actual data may show:

```text
Median:
5 hours

90th percentile:
14 hours
```

If we only record the target, we lose the true operating state.

The governance system needs to know:

```text
Desired State
vs
Observed Baseline
```

The gap itself becomes useful evidence.

## A baseline should come from observed operation

Ideally, governance baselines should use actual historical evidence.

For example:

```text
Last 12 weeks:

Median escalation-to-decision time:
4.8 hours

90th percentile:
11.2 hours

P1 median:
1.7 hours

P2 median:
6.3 hours
```

Now future performance can be interpreted against a real operating pattern.

## But historical behaviour should not automatically become acceptable behaviour

This is another danger.

Suppose:

```text
Historical missed-verification rate:
35%
```

That is the baseline.

But it should not become:

```text
35% missed verification is normal,
therefore acceptable.
```

A bad historical state can still be a valid baseline.

It simply tells us where we started.

## Baseline and tolerance should remain separate

For example:

```text
Observed Baseline:
Verification completion = 65%

Desired Target:
95%

Minimum Tolerance:
90%
```

This tells us three different things.

1. Current reality is weak.
2. We know where we want to go.
3. We know the minimum acceptable boundary.

That is much more useful than one isolated KPI.

## Governance baselines should be segmented

A global baseline can hide important variation.

Suppose:

```text
Average Decision Latency:
6 hours
```

But by priority:

```text
P1:
1.5 hours

P2:
5 hours

P3:
14 hours
```

That may be perfectly reasonable.

Or the reverse may reveal a problem.

Similarly, baselines may need segmentation by:

```text
Risk Class
Priority
Surface Tier
Business Unit
Decision Type
Owner
Governance Version
```

where the distinction materially affects interpretation.

## One baseline for everything can create false conclusions

Imagine:

```text
Expected remediation completion:
48 hours
```

for every case.

But cases may include:

```text
Fix canonical tag
```

and:

```text
Correct outdated third-party profiles across 20 external sources
```

These should not necessarily share the same baseline.

The work is structurally different.

## Baselines should reflect process type

For example:

### Technical correction

```text
Typical remediation:
hours / days
```

### External-source correction

```text
Typical remediation:
days / weeks
```

### Entity-positioning change

```text
Typical evidence window:
multiple scans
```

### Governance redesign

```text
Typical effectiveness window:
multiple decision cycles
```

Different processes need different reference states.

## Baselines should be time-bound

A baseline should answer:

```text
Baseline from when?
```

because the operating environment changes.

For example:

```text
Baseline:
Jan–Mar 2026
```

may no longer represent:

```text
Sep 2026
```

if the organisation has since changed:

```text
team size
automation
review process
governance rules
AI platforms monitored
```

So every baseline should include an observation period.

## A useful baseline record might contain

```text
Baseline ID
Indicator
Population / Segment
Observation Period
Sample Size
Median
Range
Percentile
Known Exceptions
Governance Version
Data Quality
Limitations
Established Date
Review Date
```

Not every case needs all fields.

But the principle is:

> A baseline should be traceable.

## Sample size matters

Suppose:

```text
P1 Decision Latency Baseline:
1.8 hours
```

based on:

```text
2 cases
```

That is weak evidence.

The baseline may still be useful provisionally.

But it should be labelled accordingly.

For example:

```text
Baseline Status:
Provisional
```

rather than pretending it is stable.

## A baseline can mature over time

Maybe:

```text
PROVISIONAL
Limited observations

EMERGING
Pattern becoming visible

ESTABLISHED
Sufficient operating history

REVALIDATION REQUIRED
Operating environment materially changed
```

This avoids false confidence.

## Baseline quality depends on measurement consistency

Suppose decision latency was measured differently over time.

Month 1:

```text
Escalation created
→ Decision recorded
```

Month 2:

```text
Evidence complete
→ Decision recorded
```

Those are not the same metric.

Combining them into one baseline creates misleading evidence.

So baseline construction requires:

```text
Stable Definition
+
Consistent Measurement
+
Known Observation Window
```

## Measurement-definition changes may break comparability

If the indicator definition changes, the historical baseline may no longer be valid.

For example:

```text
v1.0:
Decision latency starts at signal detection

v1.1:
Decision latency starts at escalation
```

The new metric cannot simply inherit the old baseline.

That should trigger:

```text
Baseline Re-establishment
```

## Governance version matters

This connects directly to #052 and #053.

Suppose governance v1.0 required:

```text
2 approvals
```

and v1.1 requires:

```text
1 approval
```

Decision latency under both systems should not automatically be mixed into one baseline.

Better:

```text
v1.0 Baseline
vs
v1.1 Baseline
```

Now the effect of the change becomes observable.

## A governance change can invalidate the baseline

This is important.

If we materially change:

```text
Escalation Rule
Evidence Standard
Decision Authority
Automation
```

then previous operating behaviour may no longer represent the new system.

So after material governance change:

```text
Old Baseline
→ Historical Reference

New Operation
→ Establish New Baseline
```

Both may remain useful.

## Historical baselines should not be deleted

Because they show evolution.

For example:

```text
Governance v1.0
Decision Latency:
8.4h

Governance v1.1
Decision Latency:
5.2h

Governance v1.2
Decision Latency:
4.7h
```

That creates evidence of operating maturity.

Deleting old baselines would remove that learning.

## Baselines make governance changes easier to evaluate

In #053 we needed to know:

> Did this governance change work?

A baseline gives us:

```text
Before
vs
After
```

For example:

```text
Before change:
Evidence rework = 28%

After change:
Evidence rework = 11%
```

Now we can compare.

Without a pre-change baseline, we may only say:

```text
Current rework = 11%
```

with much less confidence about whether improvement occurred.

## Baseline capture should happen before major changes where possible

A useful pattern may be:

```text
Observed Problem
↓
Capture Current Baseline
↓
Implement Governance Change
↓
Observe New Performance
↓
Compare
```

Otherwise teams sometimes realise afterward:

```text
We changed the system,
but we don't know what the previous state was.
```

Then effectiveness analysis becomes weaker.

## Sometimes a baseline must be reconstructed

Reality is messy.

The system may begin measuring only after a change.

Historical evidence might still exist in:

```text
logs
tickets
decision records
Git history
monitoring data
timestamps
```

A reconstructed baseline may be possible.

But it should be labelled:

```text
Reconstructed Baseline
```

with limitations.

## Do not pretend reconstructed evidence is equivalent to planned measurement

For example:

```text
Planned Baseline:
consistent timestamps across 100 cases
```

is different from:

```text
Reconstructed Baseline:
manual estimate from 18 historical cases
```

Both can be useful.

But confidence differs.

## Baselines need data-quality notes

Potential issues include:

```text
missing timestamps
inconsistent classification
changed process
incomplete records
small sample
survivorship bias
```

Without these notes, baseline precision may be overstated.

## Median may sometimes be more useful than average

Governance data can contain extreme cases.

For example:

```text
Decision times:
1h
2h
2h
3h
42h
```

Average:

```text
10h
```

Median:

```text
2h
```

Both tell us something.

The average shows the impact of the extreme case.

The median shows typical behaviour.

So the right baseline statistic depends on the question.

## Tail behaviour may matter more than typical behaviour

For critical governance processes, the worst cases may matter more.

For example:

```text
Median P1 latency:
45 minutes

95th percentile:
9 hours
```

The median looks excellent.

But a small number of severe delays may represent unacceptable risk.

So baselines may need:

```text
Typical State
+
Tail State
```

not only one central number.

## A baseline should preserve material exceptions

If three cases were extreme because of:

```text
public holiday
system outage
external dependency
```

we should not necessarily delete them.

Instead record:

```text
Known Exception
```

because exceptional conditions are part of real operation.

The system may need to remain resilient during them.

## Normal variation matters

Once enough data exists, the baseline can show a normal operating range.

For example:

```text
Evidence Rework Rate:
normally 8–14%
```

Then:

```text
11%
```

is probably normal.

But:

```text
24%
```

may deserve investigation.

This is more useful than treating every movement as meaningful.

## Baselines help distinguish noise from deterioration

That is especially relevant to AI-related work.

Suppose:

```text
Weekly governance metric:
13%
→ 15%
→ 12%
→ 14%
```

Maybe normal variation.

Then:

```text
14%
→ 19%
→ 24%
→ 31%
```

That looks different.

The baseline helps distinguish:

```text
Variation
```

from:

```text
Material Pattern Change
```

## This mirrors the AI visibility problem again

We already learned:

```text
One AI response
≠
Visibility pattern
```

Now:

```text
One governance metric value
≠
Performance trend
```

In both systems, repeated observation creates context.

## Baselines should include trend context

A useful performance view may include:

```text
Current Value
Baseline Range
Direction of Travel
Tolerance
```

For example:

```text
Decision Reversal Rate

Baseline:
4–7%

Current:
8%

Trend:
Increasing

Tolerance:
10%
```

The system is still inside tolerance.

But the direction may justify attention.

## Baseline does not replace tolerance

Again:

```text
Baseline:
what usually happens

Tolerance:
what we are willing to accept
```

A system can operate:

```text
inside baseline
but outside tolerance
```

if historical performance has always been weak.

Or:

```text
outside baseline
but inside tolerance
```

during harmless temporary variation.

Both situations require different interpretation.

## Baseline should not become an excuse for poor performance

This matters organisationally.

Teams may say:

```text
That's normal here.
```

But:

```text
Normal
≠
Acceptable
```

A bad baseline should motivate improvement, not institutionalise mediocrity.

## External benchmarks can help, but they are not the baseline

Suppose another organisation says:

```text
P1 decisions average 30 minutes.
```

Useful context.

But their:

```text
risk profile
team size
workflow
authority model
technology
```

may be different.

So:

```text
External Benchmark
≠
Internal Baseline
```

Both can coexist.

## Internal baseline answers a different question

External benchmark:

> How do others perform?

Internal baseline:

> How does our own system normally behave?

For governance improvement, the second question is often more immediately actionable.

## Baselines can expose hidden operational debt

Suppose the baseline shows:

```text
35% of escalations require evidence rework
```

Maybe nobody noticed because each case was handled individually.

Once aggregated, a systemic issue becomes visible.

The baseline itself becomes diagnosis evidence.

## Stable poor performance is still a problem

A trend dashboard may show:

```text
Evidence rework:
31%
32%
30%
31%
```

Very stable.

No deterioration.

But if desired performance is:

```text
<10%
```

the system still needs improvement.

This is why we need:

```text
Baseline
+
Target
+
Tolerance
```

rather than trend alone.

## Baselines can identify where improvement effort should start

Suppose:

```text
Detection:
strong

Escalation:
strong

Evidence:
weak

Decision:
acceptable

Verification:
weak
```

The baseline creates a map of current governance capability.

That helps prioritise intervention.

## Baselines can support maturity assessment

Instead of vague claims like:

```text
Our governance is mature.
```

the organisation can show:

```text
Decision logging:
98%

Verification completion:
91%

Reopened issues:
6%

P1 decision latency:
within tolerance 94% of cases
```

Still imperfect.

But now maturity has evidence behind it.

## Baselines should not become vanity metrics

The purpose is not to publish:

```text
Governance Score:
92/100
```

unless such a model has a defensible basis.

The baseline is more useful as operating evidence.

For example:

```text
Where are we?
What is changing?
Where are we consistently weak?
```

## A compact baseline set may be enough

For an early Authority Governance System, perhaps:

```text
Detection-to-Escalation Time
Escalation Evidence Rework
Escalation-to-Decision Time
Decision Reversal / Reopen
Repeated Remediation
Verification Completion
Governance Friction
```

Establishing credible baselines for seven indicators may be more valuable than measuring fifty.

## Baselines themselves should have owners

Someone needs to know:

```text
who maintains the baseline
who reviews it
when it becomes stale
when it needs recalculation
```

Otherwise a baseline can remain on a dashboard long after the operating system has changed.

## Baseline review should be event-triggered too

A scheduled review is useful.

But some events should trigger immediate reconsideration:

```text
major governance version change
new automation
new business unit
new AI platform
new risk class
significant workload change
measurement-definition change
```

These may make the previous baseline less representative.

## A baseline can drift

Over time:

```text
what was normal
```

may gradually change.

This can happen because of:

```text
better automation
more complexity
team growth
process deterioration
market change
```

So baselines themselves should not be permanent.

## But recalculating the baseline too often can hide deterioration

This is subtle.

Suppose performance becomes worse every month.

If we continuously redefine the baseline to current performance:

```text
Month 1:
4h normal

Month 2:
5h normal

Month 3:
7h normal

Month 4:
9h normal
```

the system can normalise deterioration.

That is dangerous.

## Baseline updates need change discipline

A new baseline should not simply replace an old one because current performance changed.

We should ask:

```text
Did the operating model legitimately change?

Or has performance deteriorated?
```

If the latter, changing the baseline would hide the problem.

## Historical and current baselines should coexist

Perhaps:

```text
Original Baseline
Current Operating Baseline
Target
Tolerance
```

For example:

```text
Original:
8h

Current:
5h

Target:
3h

Tolerance:
6h
```

This shows:

```text
improvement
remaining gap
current operating reality
acceptable boundary
```

all at once.

## Governance change should sometimes create a new baseline version

For example:

```text
Governance Performance Baseline v1.0
Operating period:
Jul–Sep

Governance Change:
1 Oct

Governance Performance Baseline v1.1
Established:
Oct–Dec
```

Now comparisons remain traceable.

## Baselines make longitudinal governance evidence stronger

Over time, the organisation can see:

```text
Baseline v1.0
↓
Governance Change
↓
Baseline v1.1
↓
Governance Change
↓
Baseline v1.2
```

That begins to show whether governance maturity is actually improving.

## Automation can help establish baselines

If events are timestamped consistently:

```text
DetectedAt
PrioritisedAt
EscalatedAt
DecisionAt
RemediationAt
VerifiedAt
```

the system can calculate historical distributions automatically.

That reduces manual reporting.

## Automation can also detect baseline deviation

For example:

```text
Historical normal:
Escalation Evidence Rework 8–14%

Current 4-week average:
23%
```

The system can flag:

```text
Baseline Deviation
```

for investigation.

## But baseline deviation should not automatically become failure

Because context may have changed.

For example:

```text
new high-risk client
temporary workload spike
new evidence standard
major campaign
```

may reasonably alter performance.

So:

```text
Deviation
→ Investigate
```

not:

```text
Deviation
→ Automatic conclusion
```

## Baseline deviations may become governance signals

This creates another useful connection.

Risk indicators observe authority risk.

Governance performance indicators observe the operating system.

Baseline deviation makes a governance performance indicator meaningful.

For example:

```text
Governance Performance Indicator:
Decision Latency

Baseline:
3–5h

Current:
11h

Signal:
Material baseline deviation
```

Now the metric becomes actionable.

## The next layer after baseline is probably tolerance

Conceptually, we can now see:

```text
Indicator
↓
Baseline
↓
Tolerance
↓
Trigger
↓
Investigation
```

Very similar to the earlier risk-measurement architecture.

But I would not collapse them prematurely.

Baseline answers:

> What is normal?

Tolerance answers:

> What remains acceptable?

Those are distinct.

## This creates a useful symmetry in the Authority Governance model

For authority risk:

```text
Risk
↓
Risk Indicator
↓
Current State
↓
Tolerance
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
Tolerance
↓
Trigger
```

The system begins to use the same measurement discipline on itself.

## The architecture now becomes

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
```

The measurement layer is becoming more usable.

## The system can now answer three different questions

```text
1. What is happening?

Governance Performance Indicator

2. Is this different from normal?

Governance Performance Baseline

3. Is the difference unacceptable?

Governance Performance Tolerance
```

Those questions should not be merged.

## The commercial implication

A basic monitoring service might say:

> Average decision time is 7 hours.

A stronger authority-governance system can say:

> Average decision time is currently 7 hours. The established baseline is 3–5 hours, the deterioration has persisted for four weeks, and the pattern began after the latest evidence-policy change.

That is substantially more useful.

It gives:

```text
measurement
+
context
+
history
+
possible cause
```

instead of an isolated number.

## The working principle

My current working principle is:

> Governance performance indicators make the Authority System observable. Governance performance baselines establish the reference state required to determine whether that performance is stable, improving or deteriorating without confusing historical normality with acceptable performance.

That is why authority systems need governance performance baselines, not just governance performance indicators.
