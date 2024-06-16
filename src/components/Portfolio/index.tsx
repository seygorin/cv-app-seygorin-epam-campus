import React, {useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import styles from './Portfolio.module.css'
import PortfolioInfo from './PortfolioInfo'
import { useTranslation } from 'next-i18next'

interface PortfolioItem {
  id: number
  category: string
  imageUrl: string
  info: {
    title: string
    text: string
    url: string
  }
}

const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    category: 'Apps',
    imageUrl: '/assets/jobs/app-desktop-app.png',
    info: {
      title: 'Momentum App',
      text: "Momentum - an analog of the same-named Chrome web store application. The app shows the time and the user's name, music, weather by location",
      url: 'https://seygorin-stage0-momentum.netlify.app/',
    },
  },
  {
    id: 1.1,
    category: 'Apps',
    imageUrl: '/assets/jobs/app-react-app.png',
    info: {
      title: 'CRUD Gallery App',
      text: 'First attempt to use React as a library for creating web applications, tried different approaches, worked with API',
      url: 'https://seygorin-gallery.netlify.app/',
    },
  },
  {
    id: 1.2,
    category: 'Apps',
    imageUrl: '/assets/jobs/app-simple-vue-app.png',
    info: {
      title: 'Vue Online Shop',
      text: 'A simple online shop application built with Vue using a public API: filtering products by category, search, cart, favorites',
      url: 'https://seygorin-vue-online-shop-mediana.netlify.app/',
    },
  },
  {
    id: 2,
    category: 'Games',
    imageUrl: '/assets/jobs/games-calculator.png',
    info: {
      title: 'Calculator',
      text: 'The basics, without which you cannot become a true programmer, a calculator made with pure JS, without using libraries and frameworks',
      url: 'https://seygorin.github.io/calculator/',
    },
  },
  {
    id: 2.1,
    category: 'Games',
    imageUrl: '/assets/jobs/games-selectors.png',
    info: {
      title: 'Selectors CSS',
      text: 'A CSS trainer - an application similar to CSS Diner, with similar functionality but very poor design and colors',
      url: 'https://rolling-scopes-school.github.io/seygorin-JSFE2023Q1/rs-css/',
    },
  },
  {
    id: 2.2,
    category: 'Games',
    imageUrl: '/assets/jobs/games-minesweeper.png',
    info: {
      title: 'Minesweeper',
      text: 'Classic game — Minesweeper. With fun sounds, game history, a timer, and a mine counter',
      url: 'https://rolling-scopes-school.github.io/seygorin-JSFE2023Q1/minesweeper/',
    },
  },
  {
    id: 3,
    category: 'Landings',
    imageUrl: '/assets/jobs/landings-frontend-way.png',
    info: {
      title: 'Frontend Way',
      text: 'The very first experience in layout, a lot of boilerplate, but overall, not bad. Looks good only for desktops',
      url: 'https://seygorin.github.io/fe-way.html',
    },
  },
  {
    id: 3.1,
    category: 'Landings',
    imageUrl: '/assets/jobs/landings-plants.png',
    info: {
      title: 'Plants',
      text: 'A simple landing page with pure JS/CSS, animations, and almost responsive layout',
      url: 'https://rolling-scopes-school.github.io/seygorin-JSFEPRESCHOOL2022Q4/plants/',
    },
  },
  {
    id: 3.2,
    category: 'Landings',
    imageUrl: '/assets/jobs/landings-pet-store.png',
    info: {
      title: 'Pet Store',
      text: 'A more complex landing page with dropdown windows, animations, responsive layout, and pagination. Pure JS/CSS',
      url: 'https://rolling-scopes-school.github.io/seygorin-JSFE2023Q1/shelter/',
    },
  },
  {
    id: 4,
    category: 'Jobs',
    imageUrl: '/assets/jobs/jobs-upkeep.png',
    info: {
      title: 'upkeep.kz',
      text: 'Almost first job on a real project, I worked on the dashboard: added new functionality, rewrote old components etc.',
      url: 'https://app.upkeep.kz/',
    },
  },
  {
    id: 4.1,
    category: 'Jobs',
    imageUrl: '/assets/jobs/jobs - romantic.jpeg',
    info: {
      title: 'Romantic (Aktau)',
      text: 'Freelance project that never saw the light of day due to legal issues, I worked on the dashboard',
      url: 'https://github.com/seygorin/RomanticAdminApp',
    },
  },
]

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All')
  const gridRef = useRef<HTMLDivElement>(null)
  const isoRef = useRef<Isotope | null>(null)

	 const { t } = useTranslation('portfolio');

  useEffect(() => {
    const initializeIsotope = async () => {
      const Isotope = (await import('isotope-layout')).default
      if (gridRef.current) {
        isoRef.current = new Isotope(gridRef.current, {
          itemSelector: `.${styles.item}`,
          layoutMode: 'fitRows',
        })
      }
    }

    initializeIsotope()

    return () => {
      if (isoRef.current) {
        isoRef.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (isoRef.current) {
      isoRef.current.arrange({
        filter: filter === 'All' ? '*' : `.${filter.replace(/\s+/g, '-')}`,
      })
    }
  }, [filter])

  const categories = [
    'All',
    ...Array.from(new Set(portfolioData.map((item) => item.category))),
  ]

  return (
    <div className={styles.portfolio}>
      <div className={styles.tabs}>
        {categories.map((category, index) => (
          <div key={category}>
            <span
              key={category}
              onClick={() => setFilter(category)}
              className={`${styles.breadcrumb} ${
                filter === category ? styles.active : ''
              }`}
            >
              {category}
            </span>
            {index < categories.length - 1 && (
              <span style={{margin: '0 5px'}}> / </span>
            )}
          </div>
        ))}
      </div>
      <div ref={gridRef} className={styles.items}>
        {portfolioData.map((item) => (
          <div
            key={item.id}
            className={`${styles.item} ${item.category.replace(/\s+/g, '-')}`}
          >
            <div className={styles.imageContainer}>
              <Image
                src={item.imageUrl}
                width={300}
                height={300}
                alt={item.category}
                className={styles.image}
              />
              <div className={styles.info}>
                <PortfolioInfo {...item.info} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio
