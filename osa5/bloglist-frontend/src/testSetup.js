import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'


// ilman tata jokainen render() jaisi edelliselta testilta dom:iin ja sekoittaisi seuraavan testin
afterEach(() => {
  cleanup()
})
