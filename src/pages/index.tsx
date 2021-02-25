// Components
import Head from 'next/head'
import ExperienceBar from '../components/ExperienceBar'
import Container from '../components/Container'
import Profile from '../components/Profile'
import CompleteChallenges from '../components/CompleteChallenges'
import Countdown from '../components/Countdown'

// Style
import style from '../style/scss/pages/home.style.module.scss'
import ChallengeBox from '../components/ChallengeBox'
import CountdownProvider from '../contexts/CountdownContext'

export default function Home() {
  return (
    <>
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
    </>
  )
}
