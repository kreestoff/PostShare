import React, { Component } from 'react';


export default class Vote extends Component {

 


    render() {
        return(
            <div className="vote-container">
                <div onClick={this.props.upVote} className="upvote"><img style={{width: "15px"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAxlBMVEUAgAD///8AfgAAewCTu5MAegAAgwAAgQB9vX0AeAAAhAD8/vz6/foAhgDm8+bz+fPv+O/i8OLX69fx+fHb7Nuz2LNRqFE8lzyk0KTE38QgjCB4tXhnq2dxsnGKw4qFvYWXypdXpVfC4MIjkyPP589Im0i01LQwlTBeqF4liyWXxZcbiBugyqAflR+r0quUw5S63rpMmExrtmuIxIgEjwRAm0AvjS9Zq1k7nDuFtoWgx6CRx5E/oD9ytnJ0sHRaolpAlEC61bpC3rI7AAAJqklEQVR4nO3d+XeiOhsH8KcPF+hUQcQVl7rXHdtO13Hazv3//6kXse2rSDAsiSZ3vj/dc+6chs9JBLKQwAWn5EpO97rbN/O8CvwKcCrHnC1VLz/0x3qZL5KT0J4ggh8FB6syn0K34SO0ep++TRBHNwUuxfrhI2wqsBtsrEwu5W7CRdjXYD+ot4s8Ct6Ei3C3jX5lwqsWeQhvp4dAUKoWh6IvuAhzzRAggDrhc7vhILRHIY10Q1yzL/uCi9CdhwIBtD77wnkI868EIOCIx92GvbD4Ed5Ivegz5qXzEDoNohB7HN7f2At/EYEAVwvmxbMXmm2FLMR39g9F5kJ7EFGHOHZYl89cmLuJAHrN9IZx+eyFpUlEI/Xe3WbMu8OshUUjCghKm/kjkbVwFlmF3kOfeS+KsTAfdZ/ZCMfMn4iMhbfRVQiwtNleAHNh9ZjQEFxoB4cvpBNeRv8KvVyJLSw/HRUKXofXRxup4ELS8MVOcCC0cH28CvFF5OchRRV6fWCB32nys+NVCEqTeQeRnbBMUYWg/BK3b5FfHfeJ3T8sHnnn9iN0H//t2BupL/xgPwXFSujQtFGAV/Yz3oyEuReaKoRGhU3xu2EkrFMB8U7YEeHimOI2A6A3c0yK3wsbYYfGBzDl0EjZCPtTqirEUYlF6YGwEJotuiqESwaFH4SBMEfzQuqHy3oMBsIh3W0GlGr2ZYcke6HVpgOCept52WHJXuhStlEc8FnBl7nQJk/5Bhopn6UYmQtzz1RvM14VGpxWKGYt7FLWIChtTusTMxYOadsoaMNsSyYmW6FFM3KxrcIWp2Vt2QrzHZ0SCBr74YvPZCqs0L2PAqeVNNtkKaQZIP2qwhmHftM2GQqtNq0P8A+v+0yWQvoXbi9Nfl8kZCccGtRtFKZ8Xkn9ZCa0YgBxwvGjkqyEhaMz9rtxMyqVJhkJ89f0NQj4wvGDkqyExJXOYfnRzaZQumQjdGoxqhAMHgNQ38lEWO7F8IH6lkWZ1MlCaIV/UEGKxnzqfi8ZCPPrOE0UlGfhvj90YwEBuPUqtkkvdK5iCXHM7au1bVILI9dxh0Rpcr2TphcWw768iwq/ru9nUgpN+h7TNjjm12/aJp2w0InRY/KjtPh9H7tNKiHVoqCA8FdWV06bNMKcG6PH9BkOC2gCSSO8iQ/EMZdvDneTQtinHv3dEY5432hSCO1xnD7vl5DDEqFAEgvLvQRAUDh8rBZIUiH1XH1QyLN77yehMMbYqJhCqxn/JvMpFKOVWpQrgg4jyJ2mkBgoytOCYg0+MQ0R3mm6WsIfoR8B3ktnqYA44f1DjC2sz9MAM+gB5wuWZZqmVaAc0IordFMC4381msvl83nLdirdy/vqeLl8MAxD0zXDeFj+vqwUjzpjCinXVUaFsg/sVZVpFstO/fqtOngwdFRVVVEQ8fsCvP9UFONlVo5+iYgndGpJXkaDxKg9onL5klm2h86/i87kcWB4Bp9F/muoPDTtqIqMJbRHGQAB1F7/8M3Gk9lO313MXlujsaFvK4zqz6E6XkQ0izhCK+64GvGaGu+u/dm2CmZ56MFWnffWXa1xpSG1bOfvXTXJP+44wreMgJvMR633ZrP53mp9jP48NTQNMLIxHolG/nHHEHaplwPR5JODmEr2/6xJ9xt6YQa3UZbRSV9QUQtjD25zjvJMqERaYfyxX95BwrQkrfDM26gX9WcqoXnmbdQL/k4jzC9Off0UMdIIyzEnCU8SLXy5I5WQenn6SaOHT71SCV0RgKCHD+PRCC0R2ijAVfjV0wjXQlQhPiQWDs/+UegHx0mFhYQD+Lyj3CcVxlp2eMKo9YRC+/zfZrZRCD3EY8JCRxAgcVnuMWGCufrTRF0RhqOOCKm2YDmLXJGmfKKFhaYQj0IvSo80UBMtvD71hVNHX5DGTCOFlVSTMDwTsVwuSnj+/frvREwVRAhvE6wIOlleiZMXRGHBFacGvZCeFWRhuSPKg9APtoizPeHCotsDkYDe4/DdoX/iW/3ZhzA30e/guFMJHcbYExZMu9JtfjyJ54PNDMi0VQ8ZyNgVuo+1p7muZzJRcoogzEeHuxbtCv9RRbV9B+E5WI17QlFeQqOiPNiSC0EJbPoqnxCwV5JcCPO67EJsFWQX1oaSC2Huyi6EmexC5Z+/QtHzVyh+UPo7zd5hZ1IK9zZgllGII1tyIbTzkgv3XtpkFGKvILcQDdn7+GpguE02IerBJRmSCbFRD65QlExYqxwswZRL2HMO15hKJWyFfTkjkVB5C11gKo8QH8InuiUSDkKBEgkBwhecSCTEl9C5fImEhA2mZRICTEK+fZJLqPcOiXIJAR4PiLIJcRC83cgmBGVpSS4E9TknuTC4l7aEQnwsSi78D6xUgPec5ML97bakFD71JRf+B9ZiyD9/qP0Vih7cO+RFSuGd7E8LvXMhtxBrtuRCbX9+TT4hdiTvH2InMLgvmRC1jtzfWyjG7GB6Rioh1kL2tJdIiPNm2ASiRMJR+Glusgi9CqTYr01gIU5npK3QJRFerai+5RZXiDXSvpDSCO/IZ7lJIow4m1YOIWjkcz8lEQL5rDNJhJR7mwgsBAh2mqQTYoN0N5VFCMolxb4YQgsBKPZrE1tIs4+w2EJcyi4kNVOJhEr42/f+3ianvshUUcMPHtwVLh405YcXVY0+NONMg+FbRe3vomTa/duK2/15X31pbA6UEckZd5fdvGW7Pyd3T3NhthxS1/GEn85hvdOqaSIgcUwYqDm+y27JWbQacPa3WcMN35Kdbsdy05n1DOW8K5LYQaQ8GyFfdDrGGW+UFXvPvVBkyR3gmVZk1Glusc57yjn3gzPcbRDhPuK89rjnrpnd3vTMkDhfE24yiYRea71t3p3R8wO13uE+e+mEXuzF+1g7i+cHQm195KC6RMKLC8tZTE7//ECl0RkeOx4wodBrrKazetRO+QBB1egMI24xaYUbpDVcD5QTIRV1uT5y8mF64Sa58uVAi3/aXcqgYlQrlKdDpxVuUqzf16bculpeKdNql+oczMyEXqxht/3xp6ElOLwwDg4VfXrX7pKn0tgJNykN3c0BlFMj3VGGRB1qjbvXVaUY9XhnK/RjDvs3v17bo4axPY0yA6lXc6gbj62V2488cJST0M/m5E3nZrFuV8dLAzdHiiaxbo6KVVUwBtXm7GZomwnPnWci3MY/79andt6qvwfLB0NXf2xHuvwoIfH/h/+PwFiOq2/dG8cumqVCzJa5G4bC7+Q2hxYXCqWSZZlF2+lX3Hq3272+vr4M5uf1ult3b/vDsmmVCvl8LoXsK/8DL3vUb0XTDvsAAAAASUVORK5CYII="></img></div>
                <div id={`count${this.props.postId}`}>{this.props.votes}</div>
                <div onClick={this.props.downVote} className="downvote"><img style={{width: "15px"}} src="data:image/png;base64,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"></img></div>
            </div>
        )
    }

}