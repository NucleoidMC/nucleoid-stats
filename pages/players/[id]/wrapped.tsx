import { GetServerSideProps } from "next";
import { apiFetch } from "../../../src/fetch";
import { PlayerProfile } from "../../../src/model/player";
import { PlayerWrappedData } from "../../../src/model/wrapped";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import styles from '../../../styles/wrapped.module.css';
import { T } from "../../../components/translations";

export default function Page(props: { username: string, wrapped: PlayerWrappedData }) {
    const [slide, setSlide] = useState(0);

    return <>
        <Head>
            <title>{props.username}&apos;s Nucleoid Wrapped</title>
        </Head>

        <div className={styles.wrappedMain}>
            {slide === 0 && <Slide0 setSlide={setSlide} />}
            {slide === 1 && <Slide1 setSlide={setSlide} wrapped={props.wrapped} />}
            {slide === 2 && <Slide2 setSlide={setSlide} wrapped={props.wrapped} />}
            {slide === 3 && <Slide3 setSlide={setSlide} wrapped={props.wrapped} />}
            {slide === 4 && <Slide4 setSlide={setSlide} wrapped={props.wrapped} />}
            {slide === 5 && <Slide5 setSlide={setSlide} wrapped={props.wrapped} />}
            {slide === 6 && <Slide6 setSlide={setSlide} wrapped={props.wrapped} />}
            {slide === 7 && <Slide7 setSlide={setSlide} wrapped={props.wrapped} />}
            {slide === 8 && <Slide8 setSlide={setSlide} wrapped={props.wrapped} />}
        </div>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    const wrapped = await apiFetch<PlayerWrappedData>(`/player/${id}/wrapped`, {
        allow_notfound: true
    });

    if (!wrapped) {
        return { notFound: true };
    }

    const profile = await apiFetch<PlayerProfile>(`/player/${id}/username`);

    return {
        props: {
            wrapped,
            username: profile!.name,
        }
    }
}

const Slide0: React.FC<{setSlide: (slide: number) => void, static?: boolean}> = (props) => {
    return <>
        {/* From: https://icon-sets.iconify.design/basil/present-solid/ */}
        <DelayFade static={props.static} delay={0}>
            <svg xmlns="http://www.w3.org/2000/svg" width="196" height="196" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M6.25 5.5A3.25 3.25 0 0 1 12 3.423A3.25 3.25 0 0 1 17.062 7.5H18a2.5 2.5 0 0 1 2.5 2.5v1.25a.75.75 0 0 1-.75.75h-6.7a.3.3 0 0 1-.3-.3V8.24a3.267 3.267 0 0 1-.75-.663a3.267 3.267 0 0 1-.75.662V11.7a.3.3 0 0 1-.3.3h-6.7a.75.75 0 0 1-.75-.75V10A2.5 2.5 0 0 1 6 7.5h.938a3.236 3.236 0 0 1-.688-2Zm5 0a1.75 1.75 0 1 0-3.5 0a1.75 1.75 0 0 0 3.5 0Zm1.5 0a1.75 1.75 0 1 0 3.5 0a1.75 1.75 0 0 0-3.5 0Z" clipRule="evenodd"/><path fill="currentColor" d="M11.25 13.65a.3.3 0 0 0-.3-.3H5.649a.833.833 0 0 0-.82.692a11.592 11.592 0 0 0 0 3.916l.224 1.309a2.008 2.008 0 0 0 1.755 1.656l1.065.119a37.15 37.15 0 0 0 3.071.215a.298.298 0 0 0 .306-.299V13.65Zm1.806 7.607a.298.298 0 0 1-.306-.299V13.65a.3.3 0 0 1 .3-.3h5.301c.406 0 .752.292.82.692c.223 1.296.223 2.62 0 3.916l-.223 1.309a2.008 2.008 0 0 1-1.756 1.656l-1.065.119a37.177 37.177 0 0 1-3.071.215Z"/></svg>
        </DelayFade>

        <h1>
            <SlideUpInWords static={props.static} text='Welcome to Nucleoid Wrapped 2023!' />
        </h1>
        <DelayFade static={props.static} delay={1600}>
            <p>
                Ready to get started?
            </p>
        </DelayFade>
        {!props.static && <DelayFade static={props.static} delay={2500}>
            <button className={styles.button} onClick={() => props.setSlide(1)}>
                Begin!
            </button>
        </DelayFade>}
    </>
}

const Slide1: React.FC<{setSlide: (slide: number) => void, static?: boolean, wrapped: PlayerWrappedData}> = (props) => {
    const lots = props.wrapped.played_count >= 100;

    return <>
        <h1>
            <SlideUpInWords static={props.static} text='First up' />
        </h1>

        <DelayFade static={props.static} delay={1000}>
            <p>
                This year, you&apos;ve played <b>{props.wrapped.played_count}</b> games.
            </p>
        </DelayFade>

        {lots && <DelayFade static={props.static} delay={1500}><p>
            That&apos;s a whole lot!
        </p></DelayFade>}

        {!props.static && <DelayFade static={props.static} delay={lots ? 3000 : 2000}>
            <button className={styles.button} onClick={() => props.setSlide(2)}>
                What&apos;s next?
            </button>
        </DelayFade>}
    </>
}

const Slide2: React.FC<{setSlide: (slide: number) => void, static?: boolean, wrapped: PlayerWrappedData}> = (props) => {
    const topGame = props.wrapped.top_games[0];

    return <>
        <h1>
            <SlideUpInWords static={props.static} text="You also had a favourite" />
        </h1>

        <DelayFade static={props.static} delay={2000}>
            <p>
                You played <b>{topGame.total}</b> games of <b><T k={`statistic.bundle.${topGame.namespace}`} /></b>.
            </p>
        </DelayFade>

        <DelayFade static={props.static} delay={2300}>
            <p>
                Now that&apos;s some dedication.
            </p>
        </DelayFade>

        {!props.static && <DelayFade static={props.static} delay={3500}>
            <button className={styles.button} onClick={() => props.setSlide(props.wrapped.top_games.length > 1 ? 3 : 4)}>
                Next
            </button>
        </DelayFade>}
    </>
}

const Slide3: React.FC<{setSlide: (slide: number) => void, static?: boolean, wrapped: PlayerWrappedData}> = (props) => {
    return <>
        <h1>
            <SlideUpInWords static={props.static} text="It's not like you only played one game though" />
        </h1>

        <DelayFade static={props.static} delay={2700}>
            <p>
                Here&apos;s your top {Math.min(props.wrapped.top_games.length, 5)}!
            </p>
        </DelayFade>

        <ol>
            {props.wrapped.top_games.map((game, i) => {
                if (i >= 5) return;
                return <li key={i}>
                    <DelayFade static={props.static} delay={3000 + (i * 300)}>
                        <b><T k={`statistic.bundle.${game.namespace}`} /></b> - <b>{game.total}</b> games
                    </DelayFade>
                </li>
            })}
        </ol>

        {!props.static && <DelayFade static={props.static} delay={5000}>
            <button className={styles.button} onClick={() => props.setSlide(4)}>
                Next
            </button>
        </DelayFade>}
    </>
}

const Slide4: React.FC<{setSlide: (slide: number) => void, static?: boolean, wrapped: PlayerWrappedData}> = (props) => {
    return <>
        <h1>
            <SlideUpInWords static={props.static} text="How many days is that?" />
        </h1>

        <DelayFade static={props.static} delay={1800}>
            <p>
                This year, you spent <b>{props.wrapped.days_played}</b> days playing.
            </p>
        </DelayFade>

        <DelayFade static={props.static} delay={2200}>
            <p>
                Could you make that even more next year?
            </p>
        </DelayFade>

        {!props.static && <DelayFade static={props.static} delay={3500}>
            <button className={styles.button} onClick={() => props.setSlide(props.wrapped.days_played_games.length > 1 ? 5 : 6)}>
                Next
            </button>
        </DelayFade>}
    </>
}

const Slide5: React.FC<{setSlide: (slide: number) => void, static?: boolean, wrapped: PlayerWrappedData}> = (props) => {
    return <>
        <h1>
            <SlideUpInWords static={props.static} text="What about for each game?" />
        </h1>

        <DelayFade static={props.static} delay={2000}>
            <p>
                Here&apos;s your top {Math.min(props.wrapped.days_played_games.length, 5)} games by days played!
            </p>
        </DelayFade>

        <ol>
            {props.wrapped.days_played_games.map((game, i) => {
                if (i >= 5) return;
                return <li key={i}>
                    <DelayFade static={props.static} delay={2400 + (i * 300)}>
                        <b><T k={`statistic.bundle.${game.namespace}`} /></b> - <b>{game.total}</b> days
                    </DelayFade>
                </li>
            })}
        </ol>

        {!props.static && <DelayFade static={props.static} delay={5000}>
            <button className={styles.button} onClick={() => props.setSlide(6)}>
                Next
            </button>
        </DelayFade>}
    </>
}

const Slide6: React.FC<{setSlide: (slide: number) => void, static?: boolean, wrapped: PlayerWrappedData}> = (props) => {
    return <>
        <h1>
            <SlideUpInWords static={props.static} text="This isn't all about you" />
        </h1>

        <DelayFade static={props.static} delay={1800}>
            <p>
                You&apos;ve played with lots of people this year.
            </p>
        </DelayFade>

        <DelayFade static={props.static} delay={2200}>
            <p>
                <b>{props.wrapped.most_players}</b> to be precise.
            </p>
        </DelayFade>

        {!props.static && <DelayFade static={props.static} delay={3500}>
            <button className={styles.button} onClick={() => props.setSlide(props.wrapped.most_players_games.length > 1 ? 7 : 8)}>
                Next
            </button>
        </DelayFade>}
    </>
}

const Slide7: React.FC<{setSlide: (slide: number) => void, static?: boolean, wrapped: PlayerWrappedData}> = (props) => {
    return <>
        <h1>
            <SlideUpInWords static={props.static} text="Everyone else plays different things" />
        </h1>

        <DelayFade static={props.static} delay={2000}>
            <p>
                Here&apos;s the top {Math.min(props.wrapped.most_players_games.length, 5)} games you&apos;ve shared with the most people.
            </p>
        </DelayFade>

        <ol>
            {props.wrapped.days_played_games.map((game, i) => {
                if (i >= 5) return;
                return <li key={i}>
                    <DelayFade static={props.static} delay={2400 + (i * 300)}>
                        <b><T k={`statistic.bundle.${game.namespace}`} /></b> - <b>{game.total}</b> other people
                    </DelayFade>
                </li>
            })}
        </ol>

        {!props.static && <DelayFade static={props.static} delay={5000}>
            <button className={styles.button} onClick={() => props.setSlide(8)}>
                Next
            </button>
        </DelayFade>}
    </>
}

const Slide8: React.FC<{setSlide: (slide: number) => void, wrapped: PlayerWrappedData}> = (props) => {
    return <>
        <h1>
            <SlideUpInWords text="Here's everything on one page" />
        </h1>

        <DelayFade delay={2000}>
            <Slide1 setSlide={() => {}} wrapped={props.wrapped} static />
            <Slide2 setSlide={() => {}} wrapped={props.wrapped} static />
            {props.wrapped.top_games.length > 1 && <Slide3 setSlide={() => {}} wrapped={props.wrapped} static />}
            <Slide4 setSlide={() => {}} wrapped={props.wrapped} static />
            {props.wrapped.days_played_games.length > 1 && <Slide5 setSlide={() => {}} wrapped={props.wrapped} static />}
            <Slide6 setSlide={() => {}} wrapped={props.wrapped} static />
            {props.wrapped.most_players_games.length > 1 && <Slide7 setSlide={() => {}} wrapped={props.wrapped} static />}
        </DelayFade>

        <DelayFade delay={2500}>
            <button className={styles.button} onClick={() => navigator.share({url: 'https://stats.nucleoid.xyz/wrapped'})}>
                Share
            </button>
        </DelayFade>
    </>
}

function SlideUpInWords(props: { static?: boolean; text: string; }) {
    const parts = useMemo(() => props.text.split(' '), [props.text]);
    return <span>
        {parts.map((part, i) => <><span className={props.static ? '' : styles.textIn} style={props.static ? {} : {animationDelay: `${200 * i}ms`}}>{part}</span>{' '}</>)}
    </span>
}

const DelayFade: React.FC<{ static?: boolean, delay: number }> = (props) => {
    return <span className={props.static ? '' : styles.fadeIn} style={props.static ? {} : {animationDelay: `${props.delay}ms`}}>
        {props.children}
    </span>
}
