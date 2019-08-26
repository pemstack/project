import React, { useState, FunctionComponent, useEffect, useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { ReadMore } from './ReadMore'

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current!()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const maxItems: string[] = []
for (let i = 0; i < 8; i++) {
  maxItems.push('Item')
}

export const ResizingContent: FunctionComponent = () => {
  const [items, setItems] = useState(maxItems.slice(0, 3))

  useInterval(() => {
    setItems(maxItems.slice(0, Math.ceil(Math.random() * maxItems.length)))
  }, 2000)

  return (
    <div>
      <ol>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              background: '#ccc',
              margin: '24px',
              fontSize: '24px'
            }}
          >{item}
          </li>
        ))}
      </ol>
    </div>
  )
}

storiesOf('components/ReadMore', module)
  .addDecorator(story => (
    <div
      style={{
        background: '#fff',
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >
      {story()}
    </div>
  ))
  .addDecorator(decorator())
  .add('overflowing', () => (
    <ReadMore>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Integer vehicula quam ut nibh dignissim, vitae blandit lorem blandit.
        Cras felis urna, dapibus in eleifend at, faucibus ut ligula.
        Vestibulum id imperdiet quam.
        Aenean consectetur eros risus, ac vehicula sem maximus sed.
        Mauris ac imperdiet lectus. Etiam feugiat neque eget tristique maximus.
        Duis at enim vel risus pellentesque porttitor.
        Aliquam at bibendum diam. Proin placerat tortor sit amet consequat sollicitudin.
        Ut pulvinar lectus ut eros euismod vehicula.
        Sed eu sem pellentesque, ultricies massa et, vulputate nisi.
      </p>

      <p>
        Nam et orci nisi. Suspendisse sodales nibh ut justo cursus, nec tristique enim gravida.
        Nulla tempor, lorem vitae gravida semper, leo orci luctus neque, ut scelerisque lacus neque vel augue.
        Nam et varius tellus. Pellentesque sed nunc a nisi consectetur maximus.
        Duis cursus dolor at enim bibendum blandit. Morbi in commodo felis. Sed a imperdiet odio.
        Nam pellentesque nunc non velit fermentum, vel pellentesque nulla ornare.
        Donec ut odio mattis, maximus nibh in, faucibus lacus.
        Nulla facilisi. Cras bibendum nunc nec est condimentum, ac porta magna facilisis.
        Nullam cursus neque sed nunc cursus, lacinia scelerisque odio aliquet.
        Cras fringilla erat purus, ac molestie odio convallis vitae.
        Phasellus ultrices justo quam, et varius nisi volutpat in.
        Integer dui libero, porttitor nec enim eu, pretium molestie turpis.
        Etiam posuere ante vitae eros condimentum molestie vel quis quam.
        Duis odio sapien, porttitor ac diam vel, consequat pellentesque erat.
        Fusce et tellus id lorem ultricies finibus. Donec ac est ut risus malesuada varius.
        Integer faucibus sit amet nisl nec ullamcorper.
      </p>

      <p>
        Donec ligula ante, ullamcorper eget congue eget, tempus vel magna.
        Mauris euismod ullamcorper cursus. Duis aliquet nec enim a finibus.
        Aliquam eget elementum nunc. Maecenas euismod, augue nec posuere tempus,
        mauris dui pulvinar quam, quis auctor nibh nibh non enim.
        Donec porttitor ex venenatis, convallis orci ut, consequat nulla.
        Nam tempor placerat erat, at fringilla augue. Etiam suscipit non ipsum fringilla pulvinar.
        Aenean lorem lorem, finibus in dolor eget, imperdiet imperdiet ligula.
      </p>

      <p>
        Nullam aliquet nisl et orci molestie dictum.
        Suspendisse potenti. Pellentesque ut condimentum turpis, a luctus risus.
        Suspendisse fermentum scelerisque ipsum ac molestie.
        Vestibulum congue urna at urna mattis, at eleifend turpis mollis.
        Morbi ut molestie nunc, at vehicula erat. Nunc feugiat risus euismod,
        scelerisque ante vitae, tincidunt ipsum.
        Sed ipsum justo, convallis a elit at,sollicitudin ullamcorper enim.
      </p>
    </ReadMore>
  ))
  .add('not visible', () => (
    <ReadMore>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Integer vehicula quam ut nibh dignissim, vitae blandit lorem blandit.
        Cras felis urna, dapibus in eleifend at, faucibus ut ligula.
        Vestibulum id imperdiet quam.
        </p>
    </ReadMore>
  ))
  .add('resizing content', () => (
    <ReadMore>
      <ResizingContent />
    </ReadMore>
  ))
