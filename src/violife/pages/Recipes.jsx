import { useMemo, useState } from 'react'
import { IconClock } from '../art'
import { FEATURE_RECIPE, RECIPES, RECIPE_TIMES, img } from '../data'
import { useSite } from '../i18n'
import { Heading, RecipeCard, Reveal, Segmented } from '../ui'

/**
 * Filtering by time rather than by diet.
 *
 * Everything on this site is already vegan, so the live site's four
 * overlapping recipe taxonomies — dairy-free, gluten-free, vegan,
 * vegetarian — sort nothing from nothing. Time is the constraint a person
 * standing in a kitchen at six o'clock actually has.
 */
export default function Recipes() {
  const { t } = useSite()
  const [time, setTime] = useState('all')

  const timeOptions = useMemo(() => RECIPE_TIMES.map((id) => ({ id, label: t.times[id] })), [t])
  const shown = useMemo(
    () => (time === 'all' ? RECIPES : RECIPES.filter((r) => r.minutes < Number(time))),
    [time],
  )
  const feature = FEATURE_RECIPE
  const fc = t.recipes[feature.id]

  return (
    <>
      <section className="lit grain relative overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pt-36">
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal>
            <Heading eyebrow={t.recipesPage.eyebrow} title={t.recipesPage.h1} body={t.recipesPage.lede} />
          </Reveal>
        </div>
      </section>

      {/* The one wide photograph in the set, given the room it deserves. */}
      <section className="px-5 pt-6 sm:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <a
            href="#quick"
            className="group relative block overflow-hidden rounded-[1.75rem] border border-line sm:rounded-[2rem]"
          >
            <img
              src={img(feature.photo)}
              alt={fc.title}
              loading="eager"
              decoding="async"
              className="h-[18rem] w-full object-cover transition-transform duration-700 ease-[var(--ease-glass)] group-hover:scale-[1.03] sm:h-[24rem]"
            />
            <div className="glass-photo frost absolute bottom-3 left-3 right-3 rounded-[1.35rem] p-4 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md sm:p-5">
              <p className="eyebrow">{t.ui.featured}</p>
              <h2 className="mt-1.5 text-[1.25rem] font-[660] tracking-[-0.028em] sm:text-[1.5rem]">{fc.title}</h2>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-body">{fc.note}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-teal">
                <IconClock className="h-3.5 w-3.5" />
                {feature.minutes} {t.ui.minutes}
              </span>
            </div>
          </a>
        </Reveal>
      </section>

      <div id="quick" className="sticky top-[4.75rem] z-30 scroll-mt-32 px-5 py-3 sm:top-[5.75rem] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Segmented options={timeOptions} value={time} onChange={setTime} label={t.recipesPage.eyebrow} />
        </div>
      </div>

      <section className="px-5 pb-20 pt-4 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          <p aria-live="polite" className="text-[0.82rem] text-muted">
            {shown.length} {shown.length === 1 ? t.ui.recipe : t.ui.recipes}
          </p>

          {shown.length === 0 ? (
            <p className="mt-10 text-[0.95rem] text-body">{t.ui.noneThatQuick}</p>
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
