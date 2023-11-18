import { Connected } from '../components/Connected'
import { Web3Button } from '../components/Web3Button'

export function Page() {
  return (
    <>
      <h1>wagmi + Web3Modal + Next.js</h1>

      <Web3Button />

      <Connected>
        <hr />

      </Connected>
    </>
  )
}

export default Page
