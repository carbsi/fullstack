import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef(function Togglable({ buttonLabel, children }, ref) {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  // oma huomio: ref antaa parent-komponentille tavan sulkea lomake tallennuksen jälkeen
  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <div>
      {!visible && (
        <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>
      )}
      {visible && (
        <div>
          {children}
          <button type="button" onClick={toggleVisibility}>cancel</button>
        </div>
      )}
    </div>
  )
})

export default Togglable
