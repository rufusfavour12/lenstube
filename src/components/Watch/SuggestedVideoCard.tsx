import ShareModal from '@components/Common/VideoCard/ShareModal'
import VideoOptions from '@components/Common/VideoCard/VideoOptions'
import getThumbnailUrl from '@utils/functions/getThumbnailUrl'
import imageCdn from '@utils/functions/imageCdn'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import React, { useState } from 'react'
import { LenstubePublication } from 'src/types/local'
dayjs.extend(relativeTime)

const SuggestedVideoCard = ({ video }: { video: LenstubePublication }) => {
  const [showShare, setShowShare] = useState(false)

  return (
    <div className="flex justify-between overflow-hidden group">
      <ShareModal video={video} show={showShare} setShowShare={setShowShare} />
      <div className="flex justify-between">
        <div className="flex-none overflow-hidden rounded-lg">
          <Link href={`/watch/${video.id}`}>
            <a className="rounded-lg cursor-pointer">
              <img
                src={imageCdn(getThumbnailUrl(video))}
                alt=""
                draggable={false}
                className="object-cover object-center h-20 w-36"
              />
            </a>
          </Link>
        </div>
        <div className="px-2.5 overflow-hidden">
          <div className="flex flex-col items-start pb-1">
            <div className="flex w-full items-start overflow-hidden justify-between space-x-1.5">
              <Link passHref href={`/watch/${video.id}`}>
                <a className="overflow-hidden text-sm font-medium line-clamp-1">
                  <span className="flex line-clamp-1">
                    {video.metadata?.name}
                  </span>
                </a>
              </Link>
            </div>
            <div className="truncate">
              <Link href={`/${video.profile?.handle}`}>
                <a className="text-xs truncate hover:opacity-100 opacity-70">
                  {video.profile?.handle}
                </a>
              </Link>
            </div>
            <div className="flex truncate items-center text-[11px] opacity-70 mt-0.5">
              <span className="whitespace-nowrap">
                {video.stats?.totalUpvotes} likes
              </span>
              <span className="middot" />
              <span>{dayjs(new Date(video.createdAt)).fromNow()}</span>
            </div>
          </div>
        </div>
      </div>
      <VideoOptions video={video} setShowShare={setShowShare} />
    </div>
  )
}

export default SuggestedVideoCard
