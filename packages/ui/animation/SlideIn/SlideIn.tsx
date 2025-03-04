import { createContext, FC, ReactElement, useContext, useRef } from 'react'

import { FromBottom } from './FromBottom'
import { FromLeft } from './FromLeft'
import { FromRight } from './FromRight'
import { FromTop } from './FromTop'

interface RootProps {
  children: ReactElement | Array<ReactElement>
}

const SlideInContext = createContext<HTMLElement | null | undefined>(undefined)

export const Root: FC<RootProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <SlideInContext.Provider value={ref?.current}>
      {children}
      <div ref={ref} />
    </SlideInContext.Provider>
  )
}

export const useSlideInContext = () => {
  return useContext(SlideInContext)
}

export const SlideIn: FC<RootProps> & {
  FromLeft: FC<FromLeft>
  FromRight: FC<FromRight>
  FromBottom: FC<FromBottom>
  FromTop: FC<FromTop>
} = Object.assign(Root, {
  FromLeft: FromLeft,
  FromRight: FromRight,
  FromBottom: FromBottom,
  FromTop: FromTop,
})
