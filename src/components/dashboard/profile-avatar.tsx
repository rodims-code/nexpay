type ProfileAvatarProps = {
  gender?: string | null
  alt: string
  className: string
}

export function ProfileAvatar({ gender, alt, className }: ProfileAvatarProps) {
  const src =
    gender === 'female'
      ? '/images/userProfileF.png'
      : '/images/userProfileM.png'

  return <img src={src} alt={alt} className={className} />
}
