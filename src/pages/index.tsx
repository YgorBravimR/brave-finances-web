import Image from 'next/image'
import { useState } from 'react'
import { Button, Link } from '@mui/material'
import { HomepageContainer, ImageSectionContainer, FormSectionContainer, } from '../styles/pages/homepage'

import mobills_home from '../assets/mobills_home.svg'
import mobills_logo from '../assets/mybills-logo-noBg.png'
import { RegisterUserForm } from '../components/homepage/RegisterUserForm'
import { LoginUserForm } from '../components/homepage/LoginUserForm'

export default function HomePage() {
  const [userPageShowed, setUserPageShowed] = useState('register')

  return (
    <HomepageContainer>
      <Link href="/dashboard" className="mobills_logo">
        <Image src={mobills_logo} alt="" height={45} width={140} />
      </Link>
      <ImageSectionContainer>
        <p>Time to boost your finances.</p>
        <Image src={mobills_home} alt="" height={456} width={320} />
        <p>
          The path is up ahead. You've taken the first step on the
          transformation of your entire finacial life and we'll guide you on
          this journey
        </p>
      </ImageSectionContainer>
      <FormSectionContainer>
        <div>
          <Button
            variant="outlined"
            onClick={() => setUserPageShowed('register')}
          >
            Sign up
          </Button>
          <Button variant="outlined" onClick={() => setUserPageShowed('login')}>
            Log In
          </Button>
        </div>
        {userPageShowed === 'register' ? (
          <RegisterUserForm />
        ) : (
          <LoginUserForm />
        )}
      </FormSectionContainer>
    </HomepageContainer>
  )
}
