// Components
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import ExperienceBar from '../components/ExperienceBar'
import Container from '../components/Container'
import Profile from '../components/Profile'
import CompleteChallenges from '../components/CompleteChallenges'
import Countdown from '../components/Countdown'
import ChallengeBox from '../components/ChallengeBox'
import CountdownProvider from '../contexts/CountdownContext'
import ChallengesProvider from '../contexts/ChallengeContext'

// Style
import style from '../style/scss/pages/home.style.module.scss'

// Props definition
type HomeProps = {
  level: number
  currentExperience: number
  completedChallenges: number
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider {...props}>
      <Head>
        <title>Início | Moventur</title>
      </Head>

      <Container>
        <ExperienceBar />
        <section className={style.home}>
          <CountdownProvider>
            <div className={style.leftContainer}>
              <Profile />
              <CompleteChallenges />
              <Countdown />
            </div>
            <div className={style.rightContainer}>
              <ChallengeBox />
            </div>
          </CountdownProvider>
        </section>
      </Container>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, completedChallenges } = context.req.cookies

  return {
    props: {
      level: parseInt(level),
      currentExperience: parseInt(currentExperience),
      completedChallenges: parseInt(completedChallenges),
    },
  }
}
