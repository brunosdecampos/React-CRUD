import type { NextPage } from 'next'
import Head from 'next/head'

type MetaProps = {
  title?: string
  description?: string
}

const Meta: NextPage<MetaProps> = ({ title, description }) => {
  const titleName = `React CRUD ${!title?.length ? '' : ' | ' + title}`

  return <>
    <Head>
      <link rel="icon" href="/images/favicon.ico" />
      <title>{titleName}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="cash, buyer, listing, list, cash buyers, buyers lists"
      />
      <meta name="author" content="React CRUD" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  </>
}

Meta.defaultProps = {
  title: '',
  description: 'Cash buyer listing sign up app'
}

export { Meta }
