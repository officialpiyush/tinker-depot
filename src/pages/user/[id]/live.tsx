import dayjs from "dayjs";
import { LucideLoader, LucidePhone, LucideVideo } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type GetServerSideProps } from "next/types";
import { useEffect, useRef, useState } from "react";
import {
  connect,
  createLocalTracks,
  type RemoteTrack,
  type RemoteAudioTrack,
  type RemoteTrackPublication,
  type RemoteVideoTrack,
} from "twilio-video";
import Topic from "~/components/Topic";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

export default function UserCallPage() {
  const router = useRouter();
  const session = useSession();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAloneOnCall, setIsAloneOnCall] = useState(true);
  const [now, setNow] = useState("00:00 GG");
  const [timeElapsed, setTimeElapsed] = useState("00:00");
  const [notes, setNotes] = useState("");

  const userId = "clh1tcefc0000l908gmskxaej";

  const { data: userData, error } = api.users.getNameFromId.useQuery(
    {
      userId: userId as string,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: roomData } = api.twilioRooms.getAccessTokenForRoom.useQuery(
    {
      talkingWith: userId as string,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const closeRoomMutation = api.twilioRooms.stopRoom.useMutation();

  const endCall = async () => {
    console.log(notes);
    await closeRoomMutation.mutateAsync({
      roomId: roomData?.roomId || "",
      talkingWith: userId as string,
      notes,
    });

    void router.push("/");
    return;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs().format("HH:mm:s A"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (roomData) {
      const roomTimeInterval = setInterval(() => {
        const elapsed = dayjs().diff(dayjs(roomData.startDate), "second");
        // convert seeconds to mm:ss
        const converted = `${Math.floor(elapsed / 60)}:${elapsed % 60}`;
        setTimeElapsed(converted);
      }, 1000);

      return () => clearInterval(roomTimeInterval);
    }
  }, [roomData]);

  const attachTracks = (track: RemoteVideoTrack | RemoteAudioTrack) => {
    if (track.kind === "video") {
      const videoElement = document.getElementById("video");
      // @ts-expect-error video element dom error
      track.attach(videoElement);
    } else if (track.kind === "audio") {
      track.attach();
    }
  };

  function subscribed(track: RemoteTrack) {
    console.log({ track });
    console.log("Subscribed to RemoteTrack:", track.sid);

    if (track.kind === "video" || track.kind === "audio") {
      attachTracks(track);
    }

    //Code for starting track rendering goes here.
  }

  function unsubscribed(track: RemoteTrack) {
    console.log("Unsubscribed to RemoteTrack:", track.sid);
    //Code for stopping track rendering goes here.
  }

  function subscriptionFailed(
    error: unknown,
    publication: RemoteTrackPublication
  ) {
    console.log(
      `Failed to subscribe to RemoteTrack ${publication.trackSid}:`,
      error
    );
    //Code for managing subscribe errors goes here.
  }

  function listenToSubscriptionEvents(publication: RemoteTrackPublication) {
    publication.on("subscribed", subscribed);
    publication.on("unsubscribed", unsubscribed);
    publication.on("subscriptionFailed", subscriptionFailed);
  }

  const connectToRoom = async () => {
    const localTracks = await createLocalTracks({
      audio: true,
      video: {
        width: 640,
      },
    });

    let peopleCount = 0;

    try {
      console.log("token", roomData?.token);
      const room = await connect(roomData?.token || "", {
        name: roomData?.roomId || "",
        audio: true,
        video: true,
        tracks: localTracks,
      });

      peopleCount = 0;
      room.participants.forEach((participant) => {
        if (participant.identity.startsWith(session.data?.user.id || "sdfsd"))
          return;

        peopleCount++;
      });

      if (peopleCount > 0) {
        setIsAloneOnCall(false);
      } else {
        setIsAloneOnCall(true);
      }

      room.participants.forEach((participant) => {
        if (participant.identity.startsWith(session.data?.user.id || "sdfsd"))
          return;

        participant.tracks.forEach(listenToSubscriptionEvents);
      });

      room.on("trackPublished", listenToSubscriptionEvents);

      room.on("participantConnected", (participant) => {
        if (participant.identity.startsWith(session.data?.user.id || "sdfsd"))
          participant.tracks.forEach(listenToSubscriptionEvents);

        setIsAloneOnCall(false);
      });

      room.participants.forEach((participant) => {
        if (participant.identity.startsWith(session.data?.user.id || "sdfsd"))
          return;

        if (participant.identity.startsWith(session.data?.user.id || "sdfsd"))
          return;

        console.log("SomeOne Else: ", participant.identity);

        participant.dataTracks.forEach((publication) => {
          console.log({ publication });
        });

        participant.videoTracks.forEach((publication) => {
          console.log({ vT: publication });
        });

        participant.tracks.forEach((publication) => {
          if (publication.isSubscribed) {
            const track = publication.track;

            if (!track) {
              console.log("No track");
              return;
            }

            if (track.kind === "video" || track.kind === "audio") {
              attachTracks(track);
            }
          }
        });
      });

      room.on("participantConnected", (participant) => {
        console.log(`Participant connected: ${participant.identity}`);
        if (participant.identity.startsWith(session.data?.user.id || "sdfsd"))
          return;

        setIsAloneOnCall(false);

        participant.tracks.forEach((publication) => {
          if (publication.isSubscribed) {
            const track = publication.track;

            if (!track) {
              console.log("No track");
              return;
            }

            if (track.kind === "video" || track.kind === "audio") {
              attachTracks(track);
            }
          }
        });

        participant.on("trackSubscribed", (track) => {
          if (track.kind === "video" || track.kind === "audio") {
            attachTracks(track);
          }
        });
      });

      room.on("participantDisconnected", (participant) => {
        console.log(`Participant disconnected: ${participant.identity}`);

        peopleCount = 0;
        room.participants.forEach((participant) => {
          if (participant.identity.startsWith(session.data?.user.id || "sdfsd"))
            return;

          peopleCount++;
        });

        if (peopleCount > 0) {
          setIsAloneOnCall(false);
        } else {
          setIsAloneOnCall(true);
        }
      });

      room.on("disconnected", () => {
        void router.push("/");
      });
    } catch (error) {
      console.log(`Unable to connect to Room`, error);
    }
  };

  useEffect(() => {
    if (roomData) {
      void connectToRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData]);

  useEffect(() => {
    if (!session.data) {
      void router.push("/login");
      return;
    }
  }, [session, router]);

  return (
    <div className="grid h-full grid-cols-12 gap-4">
      {/* calling screen */}
      <div className="col-span-8 flex h-full flex-col gap-4">
        <div className="flex w-fit items-center gap-2 rounded-3xl rounded-bl-none bg-[#D9D9D9] py-2 pl-2 pr-4">
          <div className="rounded-full bg-[#714F4F] p-2">
            <LucidePhone size={20} color="#D5B8B8" />
          </div>

          <span className="text-md">Calling Screen</span>
        </div>

        {/* call screen */}
        <div className="h-full w-full flex-1" id="remote-media-div">
          {isAloneOnCall ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg bg-[#CABDD9]">
              <div className="rounded-full bg-white p-6 ring-2 ring-black">
                <LucideLoader
                  className="animate-spin"
                  size={52}
                  color="#8C78C3"
                />
              </div>

              <span>Waiting for stream to connect</span>
            </div>
          ) : (
            <video className="h-full w-full" ref={videoRef} id="video"></video>
          )}

          {/* <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg bg-[#CABDD9]">
            <div className="rounded-full bg-white p-6 ring-2 ring-black">
              <LucidePhone size={52} color="#8C78C3" />
            </div>

            <span>Start a Call</span>
          </div> */}
        </div>

        <Topic title="ESP8266" />

        <div className="flex w-full items-center justify-center">
          <div className="w-fit">
            <button
              onClick={() => void endCall()}
              className="flex items-center gap-4 rounded-full bg-[#E84D4D] py-1 pl-1 pr-6 hover:bg-opacity-90"
            >
              <div className="rounded-full bg-[#512D2D] p-2">
                <LucideVideo color="#E5BEBE" />
              </div>

              <span>End Call</span>
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-4 flex h-full flex-col gap-4">
        <div className="flex w-full gap-2">
          <div className="flex w-full flex-col items-center gap-2 rounded-md bg-[#8C78C3] px-4 py-4 text-[#EDE6F4]">
            <div className="rounded-md bg-[#CABDD9] px-4 py-2 text-black">
              {timeElapsed}
            </div>

            <div className="font-medium uppercase">Ongoing Call</div>
          </div>

          <div className="flex w-full flex-col items-center gap-2 rounded-md bg-[#8C78C3] px-4 py-4 text-[#EDE6F4]">
            <div className="rounded-md bg-[#CABDD9] px-4 py-2 text-black">
              {now}
            </div>

            <div className="font-medium uppercase">Current Time</div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-2 rounded-md bg-[#8C78C3] px-4 py-4 text-[#EDE6F4]">
          {/* <div className="rounded-md bg-[#CABDD9] px-4 py-2 text-black">
              00 : 00
            </div> */}

          <div className="text-xl font-bold">
            {error ? "Error" : userData?.userName ?? "Loading..."}
          </div>

          <div className="font-medium uppercase">Hosted By</div>
        </div>

        <div className="flex flex-1 flex-col-reverse gap-4 rounded-md bg-[#A7CD4F] px-4 py-4 font-mono">
          <div className="flx w-full justify-center">
            <div className="flex justify-center rounded-md bg-[#8EB03F] px-8 py-2 text-center text-xl font-bold text-[#275548]">
              NOTES
            </div>
          </div>
          <div className="flex-1">
            <textarea
              onKeyDown={(e) => setNotes(e.currentTarget.value)}
              onKeyUp={(e) => setNotes(e.currentTarget.value)}
              onChange={(e) => setNotes(e.currentTarget.value)}
              placeholder="Your place to take some notes"
              className="h-full w-full resize-none rounded-md bg-[#A7CD4F] p-2 placeholder-zinc-600 focus:outline-none"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
