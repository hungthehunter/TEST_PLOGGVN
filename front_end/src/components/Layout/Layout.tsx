import  { type FC, type PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  )
}

export default Layout