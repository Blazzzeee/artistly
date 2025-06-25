'use client'

import {
  useForm,
  Controller,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  bio: yup.string().required('Bio is required'),
  category: yup.array().min(1, 'Select at least one category'),
  languages: yup.array().min(1, 'Select at least one language'),
  fee: yup.string().required('Select a fee range'),
  location: yup.string().required('Location is required'),
})

const categories = ['Singer', 'Dancer', 'Speaker', 'DJ']
const languages = ['English', 'Hindi', 'Punjabi', 'Tamil']

// Match these exactly with values in demo artists.json
const feeRanges = [
  '₹50,000 - ₹120,000',
  '₹75,000 - ₹150,000',
  '₹100,000 - ₹200,000',
  '₹120,000 - ₹250,000',
  '₹180,000 - ₹300,000',
]

export default function ArtistForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: [],
      languages: [],
    },
  })

  const [image, setImage] = useState(null)

  const onSubmit = (data) => {
    console.log('Submitted Data:', { ...data, profileImage: image })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-6 p-8 bg-card rounded-xl shadow">
      <div>
        <Label>Name</Label>
        <Input {...register('name')} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <Label>Bio</Label>
        <Textarea {...register('bio')} />
        {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
      </div>

      <div>
        <Label>Category</Label>
        <div className="flex gap-4 flex-wrap">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input type="checkbox" value={cat} {...register('category')} />
              {cat}
            </label>
          ))}
        </div>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      <div>
        <Label>Languages Spoken</Label>
        <div className="flex gap-4 flex-wrap">
          {languages.map((lang) => (
            <label key={lang} className="flex items-center gap-2">
              <input type="checkbox" value={lang} {...register('languages')} />
              {lang}
            </label>
          ))}
        </div>
        {errors.languages && <p className="text-red-500 text-sm">{errors.languages.message}</p>}
      </div>

      <div>
        <Label>Fee Range</Label>
        <Controller
          name="fee"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Fee Range" />
              </SelectTrigger>
              <SelectContent>
                {feeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.fee && <p className="text-red-500 text-sm">{errors.fee.message}</p>}
      </div>

      <div>
        <Label>Location</Label>
        <Input {...register('location')} />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>

      <div>
        <Label>Profile Image (optional)</Label>
        <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  )
}
