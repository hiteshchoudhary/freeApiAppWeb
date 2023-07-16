import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <a
            href="https://github.com/hiteshchoudhary"
            target="_blank"
            
        >
          front end | mobile dev | Backend
        </a>
          <code className={styles.code}></code>
        <div>
          <a
            href="https://youtube.com/hiteshchoudharydotcom"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn with your own APIs
          </a>
        </div>
      </div>

      <div className={styles.center}>
        
        <h1 className='text-5xl text-bold'>FreeApi.app</h1> 
        

      </div>
      <a
          href="https://youtube.com/hiteshchoudharydotcom"
          className="bg-yellow-500 text-black font-medium p-2 px-4 rounded-lg"
          target="_blank"
          rel="noopener noreferrer"
        >A project by Hitesh Choudhary and team</a>

      <div className={styles.grid}>
        <a
          href="#"
          className={styles.card}
          
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Cooked in Docs <span>-&gt;</span>
          </h2>
          <p>Docs are cooked directly inside the project in easy to use swagger. With Swagger, you can read, learn and execute code within docs.</p>
        </a>

        <Link
          href="/videos"
          className={styles.card}
          
        >
          <h2>
            Setup videos  <span>-&gt;</span>
          </h2>
          <p>Setup for an open source project can be challenging. We got you covered. Visit here to access all videos that will help you to have a complete setup of the project as well as some special configuration.</p>
        </Link>

        <a
          href="https://github.com/hiteshchoudhary"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Get project <span>-&gt;</span>
          </h2>
          <p>Project is directly available on github to access.  </p>
          <span className='text-yellow-500 p-1 rounded'>Click here to access it.</span>
        </a>

        <a
          href="#"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Featured <span>-&gt;</span>
          </h2>
          <p>
            Here are some of the featured projects sent to us by users
          </p>
        </a>
      </div>
    </main>
  )
}
