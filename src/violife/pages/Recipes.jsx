import { useMemo, useState } from 'react'
import { RECIPES } from '../data'
import { Heading, RecipeCard, Reveal, Segmented } from '../ui'

/* Filtering by time rather than by diet. Everything on this site is already
   vegan, so a "vegan recipes" filter sorts nothing from nothing — which is
   exactly what the live site's recipe taxonomy does across five overlapping
   categories. Time is the constraint people actually have. */
const TIMES = [
  { id: 'all', label: 'Any time' },
  { id: '15', label: 'Under 15' },
  { id: '25', label: 'Under 25' },
  { id: '45', label: 'Under 45' },
]

export default function Recipes() {
  const [time, setTime] = useState('all')

  const shown = useMemo(
    () => (time === 'all' ? RECIPES : RECIPES.filter((r) => r.minutes < Number(time))),
    [time],
  )

  return (
    <>
      <section className="lit grain relative overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pt-36">
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal>
            <Heading
              eyebrow="The kitchen"
              title="Cook something."
              body="No thirty-ingredient showpieces. These are the dishes people actually make on a weeknight, written down properly."
            />
          </Reveal>
        </div>
      </section>

      <div id="quick" className="sticky top-[4.75rem] z-30 scroll-mt-32 px-5 py-3 sm:top-[5.75rem] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Segmented options={TIMES} value={time} onChange={setTime} label="Filter recipes by time" />
        </div>
      </div>

      <section className="px-5 pb-20 pt-4 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          <p aria-live="polite" className="text-[0.82rem] text-muted">
            {shown.length} {shown.length === 1 ? 'recipe' : 'recipes'}
          </p>

          {shown.length === 0 ? (
            <p className="mt-10 text-[0.95rem] text-body">Nothing that quick yet. Try a longer window.</p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {shown.map((r, i) => (
                <Reveal key={r.id} delay={Math.min(i, 5) * 70}>
                  <RecipeCard recipe={r} className="h-full" />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
