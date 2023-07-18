import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <a
            href="https://github.com/hiteshchoudhary/apihub"
            target="_blank"
            
        >
          <span className='text-sm md:text-md'>Need of every developer</span>
        </a>
          <code className={styles.code}></code>
        <div>
          <a
            href="https://youtube.com/hiteshchoudharydotcom"
            target="_blank"
            
          >
            Learn with your own APIs
          </a>
        </div>
      </div>

      <div className={styles.center}>
        
        <h1 className='text-5xl text-bold'>FreeApi.app</h1> 
        

      </div>
      <a
          href="https://github.com/hiteshchoudhary/apihub"
          className="bg-yellow-500 text-black text-center font-medium py-2 px-4 rounded-lg mb-4 mx-2 relative min-w-max"
          target="_blank"
          
        >A project by Hitesh Choudhary and team</a>

      <div className={styles.grid}>
        <a
          href="#"
          className={styles.card}
          
          target="_blank"
          
        >
          <h2>
            Cooked in Docs <span>-&gt;</span>
          </h2>
          <p>Docs are cooked directly inside the project in easy to use swagger. With Swagger, you can read, learn and execute code within docs.</p>
        </a>

        <Link
          href="#"
          className={styles.card}
          
        >
          <h2>
            Setup videos  <span>-&gt;</span>
          </h2>
          <p>Setup for an open source project can be challenging. We got you covered. Visit here to access all videos that will help you to have a complete setup of the project as well as some special configuration.</p>
        </Link>

        <a
          href="https://github.com/hiteshchoudhary/apihub"
          className={styles.card}
          target="_blank"
          
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
