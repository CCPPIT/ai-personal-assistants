/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */


import React from 'react'
import Providers from './providers'

type Props = {
  children:React.ReactNode
}

const WorkspaceLayout = ({children}: Props) => {
  return (
    <div>
      <Providers>
        {children}
      </Providers>
    </div>
  )
}

export default WorkspaceLayout